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

type _IDigitCount<
  V extends (number|string),
  Count extends any[] = []
> =
  `${V}` extends `${infer V}${infer Rest}` ? 
    _IDigitCount<Rest, [any, ...Count]> 
    : Count['length']
;

type IDigitCount<V extends (number|string)> = _IDigitCount<Abs<V>>;

type IParseDigit<T extends IStrDigit> =
  T extends `${infer D extends INumDigit}` ? D : T
;

type ICompareSameLength<
  A extends (number|string),
  B extends (number|string)
> =
  A extends `${infer AD extends IStrDigit}${infer ARest}` ?
  B extends `${infer BD extends IStrDigit}${infer BRest}` ?
    DigitCompare<AD, BD> extends infer Res ?
      Res extends -1 ? -1 :
      Res extends  1 ?  1 :
      Res extends  0 ? ICompareSameLength<ARest, BRest> :
      never
    : never
  : never : 0
;

type _ICompare<
  A extends string | number,
  B extends string | number
> =
  _IDigitCount<A> extends infer AC extends INumDigit ?
  _IDigitCount<B> extends infer BC extends INumDigit ?
    DigitCompare<AC, BC> extends infer LenCompare ?
      LenCompare extends -1 ? -1 :
      LenCompare extends  1 ?  1 :
      ICompareSameLength<A, B>
    : never
  : never : never
;

type ICompare<
  A extends string | number,
  B extends string | number
> = _ICompare<Abs<A>, Abs<B>>

type _IIsNegative<T extends (number|string)> = `${T}` extends `-${infer R}` ? true : false;

type IIsNegative<T extends (number|string)> = 
  Abs<T> extends never ? never : _IIsNegative<T>;

type _INegate<T extends (number|string)> = `${T}` extends `-${infer R}` ? R : `-${T}`;

type INegate<T extends (number|string)> = 
  Abs<T> extends never ? never : _INegate<T>;

type _IReverse<
  T extends (number|string),
  Acc extends string = ''
> = 
  `${T}` extends `${infer First}${infer Rest}` ?
    _IReverse<Rest, `${First}${Acc}`> :
    Acc
;

type IReverse<T extends (number|string)> = _IReverse<Abs<T>>;

export {
  _ICompare,
  _IDigitCount,
  _IIsNegative,
  _INegate,
  _IReverse,
  INumber as Number,
  IStrDigit as StrDigit,
  INumDigit as NumDigit,
  IBasicDigit as BasicDigit,
  IIsNumeric as IsNumeric,
  IValidNumber as ValidNumber,
  IDigitCount as DigitCount,
  IParseDigit as ParseDigit,
  ICompareSameLength as CompareSameLength,
  ICompare as Compare,
  IIsNegative as IsNegative,
  INegate as Negate,
  IReverse as Reverse,
}