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
type IKeyOf<T=any> = keyof T;

/**
 * Torna todas as propriedades de T opcionais.
 * 
 * @example
 * type PartialExample = _Partial<{ a: number; b: string }>; // { a?: number; b?: string }
 */
type _IPartial<T> = Partial<T>;

export {
  _IRequired as Required,
  _IReadonly as Readonly,
  _IPick as Pick,
  _IRecord as Record,
  _IExclude as Exclude,
  _IExtract as Extract,
  _IOmit as Omit,
  _IPartial as Partial,
  IKeyOf as KeyOf,
}