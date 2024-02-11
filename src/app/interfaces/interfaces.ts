type LockType<
  fieldType extends string = string,
  valueType = any
> = Partial<Record<fieldType, valueType>>

type KeysOfType<TTarget, TValue> = {
  [K in keyof TTarget]: TTarget[K] extends TValue ? K : never
}[keyof TTarget];

type InputFields<T> = {
  [K in keyof T]-?: T[K] extends Function ? never : K
}[keyof T];

export { LockType, InputFields, KeysOfType }