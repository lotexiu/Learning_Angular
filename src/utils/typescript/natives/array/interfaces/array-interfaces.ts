import { Never } from "@ts-interfaces/misc-interfaces";

/**
 * Tipo que retorna o primeiro elemento de um array.
 * 
 * @example
 * type FirstElement = First<[number, string, boolean]>; // number
 */
type IFirst<T extends any[], _nv extends Never = never> = T extends [infer Rest, ...infer Last] ? Rest : _nv;

/**
 * Tipo que retorna o último elemento de um array.
 * 
 * @example
 * type LastElement = Last<[number, string, boolean]>; // boolean
 */
type ILast<T extends any[], _nv extends Never = never> = T extends [...infer Rest, infer Last] ? Last : _nv;

/**
 * Tipo que representa um array de tipos.
 * 
 * @example
 * type NumberArray = ArrayType<number>; // number[]
 * type MixedArray = ArrayType<[number, string]>; // [number, string]
 */
type IArrayType<
  Types = any[],
  Inf extends boolean = false,
  InfType = Never,
  _nv extends Never = never
> = [
  ...Types extends any[] ? Types : [Types],
  ...Inf extends true ? 
    InfType extends Never ?
      Types extends any[] ? 
        ILast<Types, _nv>[] : Types[] : 
      InfType[] : []
]

/**
 * Defines a value or a read-only array-like structure with a `.length` property and indexed values.
 * 
 * @example
 * type ArrayLikeString = _ArrayLike<string>; // { readonly length: number; readonly [index: number]: string; }
 */
type _IArrayLike<T> = ArrayLike<T>;

type IExtractValues<T extends readonly any[]> = T[number];

type IBuildArray<
  Length extends number,
  Acc extends unknown[] = [],
  Type = any
> = Acc['length'] extends Length ? Acc : IBuildArray<Length, [...Acc, Type], Type>;

type IPair<T=any,T2=any> = [T, T2]

export { 
  IFirst as First, 
  ILast as Last, 
  IArrayType as ArrayType,
  _IArrayLike as ArrayLike,
  IExtractValues as ExtractValues,
  IBuildArray as BuildArray,
  IPair as Pair,
}
