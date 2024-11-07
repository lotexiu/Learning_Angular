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

type Never<T extends null|never = null> = T

type TypeCompare = boolean|null;

type Nullable<Type=any> = Type|undefined|null

type First<T extends any[], _nv extends Never=never> = T extends [infer Rest, ...infer Last] ? Rest : _nv;

type Last<T extends any[], _nv extends Never=never> = T extends [...infer Rest, infer Last] ? Last : _nv;

type CompareResult<T extends TypeCompare = Never> = 
  T extends true ? 1 :
  T extends false ? 0 :
  -1

type Compare = -1|0|1  

type ArrayType<
  Types = any[],
  Inf extends boolean = false,
  InfType = Never,
  _nv extends Never = never
> = [
  ...Types extends any[] ? Types : [Types],
  ...Inf extends true ? InfType extends Never ? Types extends any[] ? 
    Last<Types, _nv>[] : Types[] : InfType[] : []
]

type Function<
  Types extends any[] = any[],
  Inf extends boolean = false,
  InfType = any
> = (...args: ArrayType<Types,Inf,InfType>) => void

/** Coloca o primeiro caracter da string recebida em maiúsculo. */
type Capitalize<S extends string> = 
  S extends `${infer First}${infer Rest}` ? 
    `${Uppercase<First>}${Rest}`: 
    S;

/** Concatena o prefixo e capitaliza a primeira letra dos métodos */
type ConcatStrIntoFunctions<Base, Prefix extends string> = {
  [Key in keyof Base as Key extends string
    ? `${Prefix}${Capitalize<Key>}`
    : never]: Base[Key];
};

export { 
  CustomReturn,
  LockedParams,
  KeysOfType,
  InputFields,
  Compare,
  Never,
  TypeCompare,
  Nullable,
  First,
  Last,
  CompareResult,
  ArrayType,
  Function
}