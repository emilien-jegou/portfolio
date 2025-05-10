import { describe, expect, test, vi, beforeEach } from 'vitest';
import { none, some } from '../option';
import { getStorage, storageGet, storageSet, storageRemove } from '.';

// Mock the window object and Cookies
const mockStorage: any = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockStorage.store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    mockStorage.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete mockStorage.store[key];
  }),
};

const mockCookies = {
  get: vi.fn((key: string) => mockStorage.store[key] ?? null),
  set: vi.fn((key: string, value: string) => {
    mockStorage.store[key] = value;
  }),
  remove: vi.fn((key: string) => {
    delete mockStorage.store[key];
  }),
};

// Mock window storage and cookies
Object.defineProperty(globalThis, 'localStorage', {
  value: mockStorage,
  writable: true,
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: mockStorage,
  writable: true,
});

vi.mock('js-cookie', () => ({
  default: mockCookies,
}));

describe.concurrent('storage', () => {
  beforeEach(() => {
    mockStorage.store = {};
    vi.clearAllMocks();
  });

  test('get an empty element', () => {
    const handle = getStorage('local', 'test');
    const result = storageGet(handle);
    expect(result).toStrictEqual(none());
  });

  test('get a non empty element', () => {
    mockStorage.store['test'] = '{ "a": 32 }';
    const handle = getStorage('local', 'test');
    const result = storageGet(handle);
    expect(result).toStrictEqual(some({ a: 32 }));
  });

  test('get a non parseable element', () => {
    mockStorage.store['test'] = '{';
    const handle = getStorage('local', 'test');
    const result = storageGet(handle);
    expect(result).toStrictEqual(none());
  });

  test('setting an element', () => {
    const handle = getStorage('local', 'test');
    const result = storageSet(handle, { a: 32 });
    expect(result.kind).toStrictEqual('success');
    expect(mockStorage.store).toStrictEqual({ test: '{"a":32}' });
  });

  test('setting an erroneous object', () => {
    const handle = getStorage('local', 'test');
    // Creating a recursive object (can't be stringified)
    const recursiveObject: any = { b: 32 };
    recursiveObject.a = recursiveObject;
    const result = storageSet(handle, recursiveObject);
    expect(result.kind).toStrictEqual('failure');
    expect(mockStorage.store).toStrictEqual({});
  });

  test('removing an element', () => {
    mockStorage.store['test'] = '{"a":42}';
    const handle = getStorage('local', 'test');
    const result = storageRemove(handle);
    expect(result.kind).toStrictEqual('success');
    expect(mockStorage.store).toStrictEqual({});
  });

  test('removing an empty element', () => {
    const handle = getStorage('local', 'test');
    const result = storageRemove(handle);
    expect(result.kind).toStrictEqual('success');
    expect(mockStorage.store).toStrictEqual({});
  });

  test('cookie storage operations', () => {
    const handle = getStorage('cookie', 'test');

    // Test setting
    const setResult = storageSet(handle, { a: 42 });
    expect(setResult.kind).toStrictEqual('success');
    expect(mockCookies.set).toHaveBeenCalledWith('test', '{"a":42}', { expires: 14 });

    // Test getting
    mockStorage.store['test'] = '{"a":42}';
    const getResult = storageGet(handle);
    expect(getResult).toStrictEqual(some({ a: 42 }));
    expect(mockCookies.get).toHaveBeenCalledWith('test');

    // Test removing
    const removeResult = storageRemove(handle);
    expect(removeResult.kind).toStrictEqual('success');
    expect(mockCookies.remove).toHaveBeenCalledWith('test');
  });

  test('session storage operations', () => {
    const handle = getStorage('session', 'test');

    const setResult = storageSet(handle, { b: 24 });
    expect(setResult.kind).toStrictEqual('success');
    expect(mockStorage.setItem).toHaveBeenCalledWith('test', '{"b":24}');

    mockStorage.store['test'] = '{"b":24}';
    const getResult = storageGet(handle);
    expect(getResult).toStrictEqual(some({ b: 24 }));
  });
});
