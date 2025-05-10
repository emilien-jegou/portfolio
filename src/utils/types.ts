export type ExtractWhen<T, V> = { [K in keyof T]-?: T[K] extends V ? K : never };

export type OnlyString<X> = X extends string ? X : never;
export type KeysMatching<T, V> = OnlyString<ExtractWhen<T, V>[keyof T]>;

export type Classes<T extends string> = Partial<Record<T, string>>;

export type IsArray<T> = T extends Array<any> ? true : false;
export type IsObject<T> = T extends object ? (false extends IsArray<T> ? true : false) : false;

type StringLiteral<Type> = Type extends string ? (string extends Type ? never : Type) : never;

// Opaque type
declare const __OPAQUE_TYPE__: unique symbol;

export type WithOpaque<Token extends string> = {
  readonly [__OPAQUE_TYPE__]: Token;
};

export type Opaque<Type, Token extends string> =
  Token extends StringLiteral<Token> ? Type & WithOpaque<Token> : never;

// Phantom type helper
export type Phantom<T, Token extends string = 'default'> = {
  readonly [K in `__phantom__${Token}`]: T;
};

export type PhantomGet<
  T extends Record<`__phantom__${Token}`, any>,
  Token extends string = 'default',
> = T[`__phantom__${Token}`];
