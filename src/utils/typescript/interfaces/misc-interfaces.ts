/**
 * Type representing `null` or `never`.
 */
type INever<T extends null|never = null> = T;

/**
 * Type that allows `null` or `undefined` in addition to the specified type.
 * 
 * @example
 * type NullableString = Nullable<string>; // string | null | undefined
 */
type INullable<Type=any, NoVoid extends boolean=false> = 
  NoVoid extends false ?
    Type|undefined|null|void :
    Type|undefined|null;

/**
 * Recursively unwraps the "awaited" type of a type. Non-promise thenables should resolve to `never`. This emulates the behavior of `await`.
 * 
 * @example
 * type AwaitedString = _Awaited<Promise<string>>; // string
 */
type _IAwaited<T> = Awaited<T>;

/**
 * Marker for type position without inference.
 * 
 * @example
 * type NoInferExample<T> = _NoInfer<T>;
 */
type _INoInfer<T> = NoInfer<T>;

export { 
  INever as Never, 
  INullable as Nullable, 
  _IAwaited as Awaited, 
  _INoInfer as NoInfer,
}
