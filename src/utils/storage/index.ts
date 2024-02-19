import Cookies from 'js-cookie';
import { pipe } from 'remeda';
import { match } from 'ts-pattern';
import { chainSome, fromNullable, none, type Option } from '~/utils/option';
import { chainSuccess, failable, ok, unwrap_or } from '../result';
import { safeJsonParse, safeJsonStringify } from '../safe-std';
import type { Result } from '../result';

export type StorageType = 'cookie' | 'local' | 'session';

export type Storage<T = unknown> = {
  get: () => Option<T>;
  set: (value: T) => Result;
  remove: () => Result;
};

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

export const safeStorage = <T>(storageKey: string, rawStorage: RawStorage): Storage<T> => ({
  get() {
    return pipe(
      failable(() => fromNullable(rawStorage.getItem(storageKey) as string | null)),
      unwrap_or(none()),
      chainSome((d) => ok(safeJsonParse<T>(d))),
    );
  },
  set(value: T) {
    return pipe(
      value,
      safeJsonStringify,
      chainSuccess((data: string) => failable(() => void rawStorage.setItem(storageKey, data))),
    );
  },
  remove() {
    return failable(() => void rawStorage.removeItem(storageKey));
  },
});

export const getStorage = <T>(storageType: StorageType, storageKey: string): Storage<T> =>
  safeStorage<T>(
    storageKey,
    match(storageType)
      .with('local', () => window.localStorage)
      .with('session', () => window.sessionStorage)
      .with('cookie', rawCookieStorage)
      .exhaustive(),
  );
