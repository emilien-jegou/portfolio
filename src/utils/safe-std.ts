import { failable } from './result';

export const safeJsonParse = <T = unknown>(value: string) => failable(() => JSON.parse(value) as T);
export const safeJsonStringify = (value: unknown) => failable(() => JSON.stringify(value));

export const safeAtob = (data: string) => failable(() => atob(data));
