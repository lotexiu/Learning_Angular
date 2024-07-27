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

/**
 * @example
 * type InputDataReturn<Type extends InputTypes> = CustomReturn<Type,[
 *  [["text","cnpj","cpf","email","pass","phone","ip"],InputDataText],
 *  [["money","number","percent"],InputDataNumbers],
 *  [["time","date","datetime"],InputDataDigits],
 *  [["slider"],InputDataSlider],
 * ]>
*/
type CustomReturn <Value, ReturnConfigList extends [any|Value[], any][]=[any[], any][]> = {
  [Config in keyof ReturnConfigList]: {
    [ValueInList in keyof ReturnConfigList[Config][0]]: 
      Value extends ReturnConfigList[Config][0][ValueInList] ? ReturnConfigList[Config][1] : never
  }[number]
}[number]

type Compare = -1|0|1

type OptionalType<Type=string> = Type|undefined

interface StateElement {
  attributes?: any
  style?: CSSStyleDeclaration
  html?: string
}

export { 
  CustomReturn,
  LockedParams,
  KeysOfType,
  InputFields,
  Compare,
  OptionalType,
  StateElement,
}