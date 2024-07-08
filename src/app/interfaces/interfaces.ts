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

type OptionalType<Type=string> = Type|undefined

interface StateElement {
  attributes?: any
  style?: CSSStyleDeclaration
  html?: string
}

interface RGBAColor {
  r: number
  g: number
  b: number
  a: number
  isBlack: (min?:number)=>boolean
  isWhite: ()=>boolean
  isTransparent: ()=>boolean
}

export { 
  LockType,
  InputFields,
  KeysOfType,
  OptionalType,
  StateElement,
  RGBAColor,
}