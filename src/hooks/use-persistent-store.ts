import { $, type QRL } from '@builder.io/qwik';
import { z } from '@builder.io/qwik-city';
import { isServer } from '@builder.io/qwik/build';

import { Err, M, pipe } from '~/utils/effect';

export class PlatformError extends Err.Builder<{ message: string }> { }
export class IndexedDBError extends Err.Builder<{ message: string; cause?: unknown }> { }
export class ValidationError extends Err.Builder<{ message: string; errors: string }> { }

interface StoreConfig {
  dbName: string;
  storeName: string;
  version?: number;
  keyPath?: string;
}

type EffectExit<T> = M.MicroExit<T>;

interface PersistentStore<T> {
  saveItem$: QRL<(item: T) => Promise<EffectExit<T | undefined>>>;
  getAllItems$: QRL<() => Promise<EffectExit<T[]>>>;
  getItem$: QRL<(key: string | number) => Promise<EffectExit<T | undefined>>>;
  deleteItem$: QRL<(key: string | number) => Promise<EffectExit<undefined>>>;
  updateItem$: QRL<(key: string | number, updater: QRL<(item: T | undefined) => T | Promise<T>>) => Promise<EffectExit<T>>>;
}

const wrapRequest = <T>(request: IDBRequest, errorMsg: string) =>
  M.async<T, IndexedDBError>((resume) => {
    request.onerror = () =>
      resume(M.fail(new IndexedDBError({ message: errorMsg, cause: request.error })));
    request.onsuccess = () => resume(M.succeed(request.result as T));
  });

const openDB = (config: StoreConfig) =>
  M.async<IDBDatabase, IndexedDBError | PlatformError>((resume) => {
    if (isServer) return resume(M.fail(new PlatformError({ message: 'Server-side IDB access' })));
    const request = indexedDB.open(config.dbName, config.version || 1);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(config.storeName))
        db.createObjectStore(config.storeName, { keyPath: config.keyPath || 'id' });
    };
    request.onerror = () =>
      resume(M.fail(new IndexedDBError({ message: 'DB Open Failed', cause: request.error })));
    request.onsuccess = () => resume(M.succeed(request.result));
  });

const runTransaction = <R>(
  config: StoreConfig,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest,
) =>
  openDB(config).pipe(
    M.andThen((db) => {
      const tx = db.transaction([config.storeName], mode);
      const store = tx.objectStore(config.storeName);
      const req = wrapRequest<R>(operation(store), `${mode} transaction failed`);
      tx.oncomplete = () => db.close();
      tx.onerror = () => db.close();
      return req;
    }),
  );

const validateAndRecover = <TIn, TOut>(
  config: StoreConfig,
  effect: M.Micro<TIn, any>,
  validator: (data: TIn) => Promise<z.SafeParseReturnType<any, any>>,
  fallback: TOut,
): M.Micro<TOut, never> =>
  effect.pipe(
    M.andThen((data): M.Micro<TOut, ValidationError> => {
      if (data === undefined || data === null) return M.succeed(data as unknown as TOut);

      return M.async((resume) => {
        validator(data)
          .then((result) => {
            if (!result.success) {
              const errorMsg = Object.entries(result.error.issues || {}).map(
                ([f, e]) => `${f}: ${JSON.stringify(e)}`,
              ).join(', ');

              resume(
                M.fail(
                  new ValidationError({
                    message: 'Schema mismatch',
                    errors: errorMsg,
                  }),
                ),
              );
            } else {
              resume(M.succeed(result.data as TOut));
            }
          })
          .catch((e) =>
            resume(
              M.fail(new ValidationError({ message: 'Validation failed', errors: String(e) })),
            ),
          );
      });
    }),
    M.catchAll((err: any) => {
      if (err._tag === 'ValidationError') {
        console.warn(`Malformed data in ${config.storeName}: ${err.errors}. Clearing...`);
        return runTransaction<void>(config, 'readwrite', (s) => s.clear()).pipe(
          M.andThen(() => M.succeed(fallback)),
          M.catchAll(() => M.succeed(fallback)),
        );
      }
      return M.succeed(fallback);
    }),
  );

export const createPersistentStore = <S extends z.ZodTypeAny>(
  schema: QRL<() => S>,
  config: StoreConfig,
) => {
  type T = z.infer<S>;

  const validateItem = $(async (d: unknown): Promise<z.SafeParseReturnType<any, any>> => {
    const s = await schema();
    const res = s.safeParse(d);
    if (!res.success) console.error('Item validation error', res.error);
    return res;
  });

  const validateArray = $(async (d: unknown): Promise<z.SafeParseReturnType<any, any>> => {
    const s = await schema();
    const arraySchema = z.array(s);
    const res = arraySchema.safeParse(d);
    if (!res.success) console.error('Array validation error', res.error);
    return res;
  });

  return (): PersistentStore<T> => {
    return {
      saveItem$: $((item: T) =>
        pipe(
          validateAndRecover(
            config,
            runTransaction<any>(config, 'readwrite', (s) => s.put(item)).pipe(M.map(() => item)),
            validateItem,
            undefined as T | undefined,
          ),
          M.runPromiseExit,
        ),
      ) as QRL<(item: T) => Promise<EffectExit<T | undefined>>>,

      getAllItems$: $(() =>
        pipe(
          validateAndRecover(
            config,
            runTransaction<unknown[]>(config, 'readonly', (s) => s.getAll()),
            validateArray,
            [] as T[],
          ),
          M.runPromiseExit,
        ),
      ) as QRL<() => Promise<EffectExit<T[]>>>,

      getItem$: $((key: string | number) =>
        pipe(
          validateAndRecover(
            config,
            runTransaction<unknown>(config, 'readonly', (s) => s.get(key)),
            validateItem,
            undefined as T | undefined,
          ),
          M.runPromiseExit,
        ),
      ) as QRL<(key: string | number) => Promise<EffectExit<T | undefined>>>,

      deleteItem$: $((key: string | number) =>
        pipe(
          runTransaction<void>(config, 'readwrite', (s) => s.delete(key)).pipe(
            M.catchAll(() => M.succeed(undefined)),
          ),
          M.runPromiseExit,
        ),
      ) as QRL<(key: string | number) => Promise<EffectExit<undefined>>>,

      updateItem$: $((key: string | number, updater: QRL<(item: T | undefined) => T | Promise<T>>) =>
        pipe(
          validateAndRecover(
            config,
            runTransaction<unknown>(config, 'readonly', (s) => s.get(key)),
            validateItem,
            undefined as T | undefined,
          ),
          M.andThen((current) => M.promise(async () => await updater(current))),
          M.andThen((updatedItem) =>
            validateAndRecover(
              config,
              runTransaction<any>(config, 'readwrite', (s) => s.put(updatedItem)).pipe(M.map(() => updatedItem)),
              validateItem,
              updatedItem
            )
          ),
          M.runPromiseExit,
        ),
      ) as QRL<(key: string | number, updater: QRL<(item: T | undefined) => T | Promise<T>>) => Promise<EffectExit<T>>>,
    };
  };
};
