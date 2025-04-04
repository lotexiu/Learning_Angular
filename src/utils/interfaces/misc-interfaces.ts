﻿/**
 * Type representing `null` or `never`.
 */
type Never<T extends null|never = null> = T;

/**
 * Type that allows `null` or `undefined` in addition to the specified type.
 * 
 * @example
 * type NullableString = Nullable<string>; // string | null | undefined
 */
type Nullable<Type=any> = Type|undefined|null|void;

/**
 * Recursively unwraps the "awaited" type of a type. Non-promise thenables should resolve to `never`. This emulates the behavior of `await`.
 * 
 * @example
 * type AwaitedString = _Awaited<Promise<string>>; // string
 */
type _Awaited<T> = Awaited<T>;

/**
 * Marker for type position without inference.
 * 
 * @example
 * type NoInferExample<T> = _NoInfer<T>;
 */
type _NoInfer<T> = NoInfer<T>;

export { 
  Never, 
  Nullable, 
  _Awaited as Awaited, 
  _NoInfer as NoInfer 
}
