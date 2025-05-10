import Cookies from 'js-cookie';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { chainSome, fromNullable, none, type Option } from '~/utils/option';
import { chainSuccess, failable, ok, unwrap_or } from '../result';
import type { Result } from '../result';
import { safeJsonParse, safeJsonStringify } from '../safe-std';
import type { Opaque, Phantom } from '../types';

export type StorageType = 'cookie' | 'local' | 'session';

// Opaque type that contains both storage info and type information
export type StorageHandle<T = unknown> = Opaque<
  {
    readonly type: StorageType;
    readonly key: string;
  },
  'StorageHandle'
> &
  Phantom<T>;

export type RawStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

const rawCookieStorage = (): RawStorage => ({
  getItem(key: string) {
    return Cookies.get(key) ?? null;
  },
  setItem(key: string, value: string) {
    return Cookies.set(key, value, { expires: 14 });
  },
  removeItem(key: string) {
    return Cookies.remove(key);
  },
});

const getRawStorage = (type: StorageType): RawStorage => {
  return match(type)
    .with('local', () => globalThis.localStorage)
    .with('session', () => globalThis.sessionStorage)
    .with('cookie', () => rawCookieStorage())
    .exhaustive();
};

// Methods now use the type from the handle
export const storageGet = <T>(handle: StorageHandle<T>): Option<T> => {
  const rawStorage = getRawStorage(handle.type);
  return pipe(
    failable(() => fromNullable(rawStorage.getItem(handle.key) as string | null)),
    unwrap_or(none()),
    chainSome((d) => ok(safeJsonParse<T>(d))),
  );
};

export const storageSet = <T>(handle: StorageHandle<T>, value: T): Result => {
  const rawStorage = getRawStorage(handle.type);
  return pipe(
    value,
    safeJsonStringify,
    chainSuccess((data: string) => failable(() => void rawStorage.setItem(handle.key, data))),
  );
};

export const storageRemove = <T>(handle: StorageHandle<T>): Result => {
  const rawStorage = getRawStorage(handle.type);
  return failable(() => void rawStorage.removeItem(handle.key));
};

export const storageHas = <T>(handle: StorageHandle<T>): boolean => {
  const rawStorage = getRawStorage(handle.type);
  return rawStorage.getItem(handle.key) !== null;
};

export const storageClear = <T>(handle: StorageHandle<T>): Result => {
  return storageRemove(handle);
};

export const getStorage = <T>(type: StorageType, key: string) =>
  ({
    type,
    key,
  }) as StorageHandle<T>;
