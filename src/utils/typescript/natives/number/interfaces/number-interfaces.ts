import { Abs, DigitCompare } from "@ts-natives/math/interfaces/math-interfaces";

type INumber<V> = V extends number ? V & number : never;

type IStrDigit = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';

type INumDigit = 0|1|2|3|4|5|6|7|8|9;

type IBasicDigit = IStrDigit|INumDigit;

type IIsNumeric<V extends string> =
  V extends `${infer First}${infer Rest}`
    ? First extends IStrDigit
      ? IIsNumeric<Rest>
      : never
    : V
;

type IValidNumber<V extends string | number> =
  V extends number ? V :
  IIsNumeric<`${V}`> extends never ? never : V
;

type _IIsNegative<T extends (number|string)> = `${T}` extends `-${infer R}` ? true : false;

type IIsNegative<T extends (number|string)> = 
  Abs<T> extends never ? never : _IIsNegative<T>
;

type _INegate<T extends (number|string)> = `${T}` extends `-${infer R}` ? R : `-${T}`;

type INegate<T extends (number|string)> = Abs<T> extends never ? never : _INegate<T>;

type _IReverse<
  T extends (number|string),
  Acc extends string = ''
> = 
  `${T}` extends `${infer First}${infer Rest extends string}` ?
    _IReverse<Rest, `${First}${Acc}`> :
    Acc
;

type IReverse<T extends (number|string)> = _IReverse<Abs<T>>;

type _IDigitCount<
  V extends (number|string),
  Count extends any[] = []
> =
  `${V}` extends `${infer V}${infer Rest}` ? 
    _IDigitCount<Rest, [any, ...Count]> 
    : Count['length']
;

type IDigitCount<V extends (number|string)> = _IDigitCount<Abs<V>>;

type _ICompareDigitCount<
  A extends (number | string),
  B extends (number | string),
  ACount extends any[] = [],
  BCount extends any[] = []
> =
  `${A}` extends `${infer _}${infer ARest}` ?
    `${B}` extends `${infer _}${infer BRest}` ?
      _ICompareDigitCount<ARest, BRest, [any, ...ACount], [any, ...BCount]> :
    1 :
  `${B}` extends `${infer _}${infer BRest}` ?
    -1:
  0
;

type ICompareDigitCount<
  A extends (number | string), 
  B extends (number | string)
> = _ICompareDigitCount<A, B>;

type IParseDigit<T extends IStrDigit> =
  T extends `${infer D extends INumDigit}` ? D : T
;

type _ICompareSameLength<
  A extends (number|string),
  B extends (number|string)
> =
  A extends `${infer AD extends IStrDigit}${infer ARest}` ?
  B extends `${infer BD extends IStrDigit}${infer BRest}` ?
    DigitCompare<AD, BD> extends infer Res ?
      Res extends -1 ? -1 :
      Res extends  1 ?  1 :
      Res extends  0 ? _ICompareSameLength<ARest, BRest> :
      never :
    never :
  never : 
  never
;

type _ICompare<
  A extends string | number,
  B extends string | number
> =
  _ICompareDigitCount<A, B> extends infer LenCompare ?
    LenCompare extends -1 ? -1 :
    LenCompare extends  1 ?  1 :
    _IDigitCount<A> extends 1 ?
      A extends IBasicDigit ?
      B extends IBasicDigit ?
        DigitCompare<A, B> :
      never :
      never :
    _ICompareSameLength<A, B> :
  never
;

type ICompare<
  A extends string | number,
  B extends string | number
> = _ICompare<Abs<A>, Abs<B>>

export {
  _ICompare,
  _IDigitCount,
  _IIsNegative,
  _INegate,
  _IReverse,
  _ICompareDigitCount,
  INumber as Number,
  IStrDigit as StrDigit,
  INumDigit as NumDigit,
  IBasicDigit as BasicDigit,
  IIsNumeric as IsNumeric,
  IValidNumber as ValidNumber,
  IDigitCount as DigitCount,
  IParseDigit as ParseDigit,
  ICompare as Compare,
  IIsNegative as IsNegative,
  INegate as Negate,
  IReverse as Reverse,
  ICompareDigitCount as CompareDigitCount,
}