import { Never } from "./misc-interfaces";

/**
 * Tipo que retorna o primeiro elemento de um array.
 * 
 * @example
 * type FirstElement = First<[number, string, boolean]>; // number
 */
type First<T extends any[], _nv extends Never = never> = T extends [infer Rest, ...infer Last] ? Rest : _nv;

/**
 * Tipo que retorna o último elemento de um array.
 * 
 * @example
 * type LastElement = Last<[number, string, boolean]>; // boolean
 */
type Last<T extends any[], _nv extends Never = never> = T extends [...infer Rest, infer Last] ? Last : _nv;

/**
 * Tipo que representa um array de tipos.
 * 
 * @example
 * type NumberArray = ArrayType<number>; // number[]
 * type MixedArray = ArrayType<[number, string]>; // [number, string]
 */
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

/**
 * Defines a value or a read-only array-like structure with a `.length` property and indexed values.
 * 
 * @example
 * type ArrayLikeString = _ArrayLike<string>; // { readonly length: number; readonly [index: number]: string; }
 */
type _ArrayLike<T> = ArrayLike<T>;

type ExtractValues<T extends readonly any[]> = T[number];

export { 
  First, 
  Last, 
  ArrayType,
  _ArrayLike as ArrayLike,
  ExtractValues,
}
