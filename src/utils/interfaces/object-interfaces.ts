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
type KeysOfType<Target, TValue> = {
  [K in keyof Target]: Target[K] extends TValue ? K : never
}[keyof Target] & string;

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
type getTypeFromKey<T, K extends keyof T> = T[K];

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
type KeyOf<T> = keyof T;

/**
 * Torna todas as propriedades de T opcionais.
 * 
 * @example
 * type PartialExample = _Partial<{ a: number; b: string }>; // { a?: number; b?: string }
 */
type _Partial<T> = Partial<T>;

/**
 * Torna todas as propriedades de T obrigatórias.
 * 
 * @example
 * type RequiredExample = _Required<{ a?: number; b?: string }>; // { a: number; b: string }
 */
type _Required<T> = Required<T>;

/**
 * Torna todas as propriedades de T somente leitura.
 * 
 * @example
 * type ReadonlyExample = _Readonly<{ a: number; b: string }>; // { readonly a: number; readonly b: string }
 */
type _Readonly<T> = Readonly<T>;

/**
 * De T, seleciona um conjunto de propriedades cujas chaves estão na união K.
 * 
 * @example
 * type PickExample = _Pick<{ a: number; b: string }, 'a'>; // { a: number }
 */
type _Pick<T, K extends keyof T> = Pick<T, K>;

/**
 * Constrói um tipo com um conjunto de propriedades K do tipo T.
 * 
 * @example
 * type RecordExample = _Record<'a' | 'b', number>; // { a: number; b: number }
 */
type _Record<K extends keyof any, T> = Record<K, T>;

/**
 * Exclui de T os tipos que são atribuíveis a U.
 * 
 * @example
 * type ExcludeExample = _Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
 */
type _Exclude<T, U> = Exclude<T, U>;

/**
 * Extrai de T os tipos que são atribuíveis a U.
 * 
 * @example
 * type ExtractExample = _Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
 */
type _Extract<T, U> = Extract<T, U>;

/**
 * Constrói um tipo com as propriedades de T, exceto aquelas no tipo K.
 * 
 * @example
 * type OmitExample = _Omit<{ a: number; b: string }, 'a'>; // { b: string }
 */
type _Omit<T, K extends keyof any> = Omit<T, K>;

/**
 * Exclui null e undefined de T.
 * 
 * @example
 * type NonNullableExample = _NonNullable<string | null | undefined>; // string
 */
type _NonNullable<T> = NonNullable<T>;

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
type ConcatStrIntoKeys<Base, Prefix extends string> = {
  [Key in keyof Base as Key extends string
    ? `${Prefix}${Capitalize<Key>}`
    : never]: Base[Key];
};

interface Constructor<T>{
  new (value?: any): T;
}

export { 
  LockedParams, 
  KeysOfType, 
  InputFields, 
  CustomReturn, 
  getTypeFromKey, 
  KeyOf, 
  _Partial as Partial, 
  _Required as Required, 
  _Readonly as Readonly, 
  _Pick as Pick, 
  _Record as Record, 
  _Exclude as Exclude, 
  _Extract as Extract, 
  _Omit as Omit, 
  _NonNullable as NonNullable,
  ConcatStrIntoKeys,
  Constructor,
}
