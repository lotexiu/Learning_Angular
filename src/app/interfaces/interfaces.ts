/**
 * Usado para limitar os campos que podem ser criados em um objeto e seus tipos.
 * 
 * @example
 * type Fields = "field1"|"field2"
 * 
 * const myObj: LockedParams<Fields, string> = {
 *  field1: "alguma coisa",
 *  filed2: "outra coisa"
 *  field3: "mais um" // Gera erro pois não existe o campo
 *  field2: 2 // Gera erro pois o tipo não é string
 * }
*/
type LockedParams<
  fieldType extends string = string,  
  valueType = any                    
> = Partial<Record<fieldType, valueType>>

/**
 * @template Target - Recebe uma interface de um objeto ou classe
 * @template TValue - Tipo dos campos a serem procurados em TTarget
 * 
 * Pode ser usado para:
 * - Tipar o retorno de uma função
 * - Tipar a atribuição de uma variavel
 * - Criar um tipo.
*/
type KeysOfType<Target, TValue> = {
  [K in keyof Target]: Target[K] extends TValue ? K : never
}[keyof Target];

/**
 * @template Target - Recebe uma interface de um objeto ou classe
 * 
 * Pode ser usado para:
 * - Tipar o retorno de uma função
 * - Tipar a atribuição de uma variavel
 * - Criar um tipo.
*/
type InputFields<Target> = {
  [K in keyof Target]-?: Target[K] extends Function ? never : K
}[keyof Target];

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
  LockedParams as LockType,
  InputFields,
  KeysOfType,
  OptionalType,
  StateElement,
  RGBAColor,
}