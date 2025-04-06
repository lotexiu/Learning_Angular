/**
 * Usado para limitar os campos que podem ser criados em um objeto e seus tipos.
 * 
 * @example
 * type Fields = "field1"|"field2"
 * 
 * const myObj: LockedParams<Fields, string> = {
 *  field1: "alguma coisa",
 *  field2: "outra coisa"
 *  field3: "mais um" // Gera erro pois não existe o campo
 *  field2: 2 // Gera erro pois o tipo não é string
 * }
 */
type ILockedParams<
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
 * 
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 *   isActive: boolean;
 * }
 * 
 * type StringKeys = KeysOfType<Example, string>; // "name"
 */
type IKeysOfType<Target, Type> = {
  [Key in keyof Target]: SafePropertyType<Target, Key, Type>
}[keyof Target]

type SafePropertyType <
  Target, 
  Key extends keyof Target,
  Type
> = Target[Key] extends Type ? Key : never

/**
 * @template Target - Recebe uma interface de um objeto ou classe
 * 
 * Pode ser usado para:
 * - Tipar o retorno de uma função
 * - Tipar a atribuição de uma variavel
 * - Criar um tipo.
 * 
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 *   isActive: boolean;
 *   getName(): string;
 * }
 * 
 * type NonFunctionKeys = InputFields<Example>; // "id" | "name" | "isActive"
 */
type IInputFields<Target> = {
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
type ICustomReturn <Value, ReturnConfigList extends [any|Value[], any][]=[any[], any][]> = {
  [Config in keyof ReturnConfigList]: {
    [ValueInList in keyof ReturnConfigList[Config][0]]: 
      Value extends ReturnConfigList[Config][0][ValueInList] ? ReturnConfigList[Config][1] : never
  }[number]
}[number]

/**
 * Extrai o tipo de uma chave específica de um objeto ou classe.
 * 
 * @template T - O tipo do objeto ou classe
 * @template K - A chave cujo tipo será extraído
 * 
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 * }
 * 
 * type IdType = getTypeFromKey<Example, 'id'>; // number
 */
type IGetTypeFromKey<T, K extends keyof T> = T[K];

/**
 * Tipo que retorna as chaves de um tipo como uma união de strings.
 * 
 * @template T - O tipo do objeto ou classe
 * 
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 * }
 * 
 * type Keys = KeyOf<Example>; // "id" | "name"
 */
type IKeyOf<T> = keyof T;

/**
 * Torna todas as propriedades de T opcionais.
 * 
 * @example
 * type PartialExample = _Partial<{ a: number; b: string }>; // { a?: number; b?: string }
 */
type _IPartial<T> = Partial<T>;

/**
 * Torna todas as propriedades de T obrigatórias.
 * 
 * @example
 * type RequiredExample = _Required<{ a?: number; b?: string }>; // { a: number; b: string }
 */
type _IRequired<T> = Required<T>;

/**
 * Torna todas as propriedades de T somente leitura.
 * 
 * @example
 * type ReadonlyExample = _Readonly<{ a: number; b: string }>; // { readonly a: number; readonly b: string }
 */
type _IReadonly<T> = Readonly<T>;

/**
 * De T, seleciona um conjunto de propriedades cujas chaves estão na união K.
 * 
 * @example
 * type PickExample = _Pick<{ a: number; b: string }, 'a'>; // { a: number }
 */
type _IPick<T, K extends keyof T> = Pick<T, K>;

/**
 * Constrói um tipo com um conjunto de propriedades K do tipo T.
 * 
 * @example
 * type RecordExample = _Record<'a' | 'b', number>; // { a: number; b: number }
 */
type _IRecord<K extends keyof any, T> = Record<K, T>;

/**
 * Exclui de T os tipos que são atribuíveis a U.
 * 
 * @example
 * type ExcludeExample = _Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
 */
type _IExclude<T, U> = Exclude<T, U>;

/**
 * Extrai de T os tipos que são atribuíveis a U.
 * 
 * @example
 * type ExtractExample = _Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
 */
type _IExtract<T, U> = Extract<T, U>;

/**
 * Constrói um tipo com as propriedades de T, exceto aquelas no tipo K.
 * 
 * @example
 * type OmitExample = _Omit<{ a: number; b: string }, 'a'>; // { b: string }
 */
type _IOmit<T, K extends keyof any> = Omit<T, K>;

/**
 * Exclui null e undefined de T.
 * 
 * @example
 * type NonNullableExample = _NonNullable<string | null | undefined>; // string
 */
type _INonNullable<T> = NonNullable<T>;

/** Concatena o prefixo e capitaliza a primeira letra dos métodos 
 * 
 * @example
 * interface Methods {
 *   getName(): string;
 *   getAge(): number;
 * }
 * 
 * type PrefixedMethods = ConcatStrIntoKeys<Methods, 'prefix'>;
 * // {
 * //   prefixGetName(): string;
 * //   prefixGetAge(): number;
 * // }
 */
type IConcatStrIntoKeys<Base, Prefix extends string|null|undefined> = {
  [Key in keyof Base as Key extends string
    ? `${Prefix}${Capitalize<Key>}`
    : never]: Base[Key];
};

interface IConstructor<T> extends Object {
  new (value?: any): T;
}

type IEntriesReturn<T> =  [IKeyOf<T>, IGetTypeFromKey<T, IKeyOf<T>>];

export { 
  ILockedParams as LockedParams, 
  IKeysOfType as KeysOfType, 
  IInputFields as InputFields, 
  ICustomReturn as CustomReturn, 
  IGetTypeFromKey as GetTypeFromKey, 
  IKeyOf as KeyOf, 
  _IPartial as Partial, 
  _IRequired as Required, 
  _IReadonly as Readonly, 
  _IPick as Pick, 
  _IRecord as Record, 
  _IExclude as Exclude, 
  _IExtract as Extract, 
  _IOmit as Omit, 
  _INonNullable as NonNullable,
  IConcatStrIntoKeys as ConcatStrIntoKeys,
  IConstructor as Constructor,
  IEntriesReturn as EntriesReturn,
}
