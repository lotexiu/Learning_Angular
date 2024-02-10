type LockType<
  fieldType extends string = string,
  valueType = any
> = Record<fieldType, valueType>

export { LockType }