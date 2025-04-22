import { Abs, DigitCompare } from "@ts-natives/math/interfaces/math-interfaces";

/**
 * Restricts to numeric types.
 * @example
 *   type T = INumber<5>; // 5 & number
 */
type INumber<V> = V extends number ? V & number : never;

type IValidAsNumber = (string|number);

/**
 * String digits from '0' to '9'.
 * @example
 *   type T = IStrDigit; // '0' | '1' | ... | '9'
 */
type IStrDigit = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9';

/**
 * Numeric digits from 0 to 9.
 * @example
 *   type T = INumDigit; // 0 | 1 | ... | 9
 */
type INumDigit = 0|1|2|3|4|5|6|7|8|9;

/**
 * Accepts both string and numeric digits.
 * @example
 *   type T = IBasicDigit; // '0' | 0 | ... | '9' | 9
 */
type IBasicDigit = IStrDigit|INumDigit;

/**
 * Checks if a string is numeric.
 * @example
 *   type T1 = IIsNumeric<'123'>; // '123'
 *   type T2 = IIsNumeric<'12a'>; // never
 */
type IIsNumeric<V extends string> =
  V extends `${infer First}${infer Rest}`
    ? First extends IStrDigit
      ? IIsNumeric<Rest>
      : never
    : V
;

/**
 * Validates if V is a valid number (string or number).
 * @example
 *   type T1 = IValidNumber<'123'>; // '123'
 *   type T2 = IValidNumber<'12a'>; // never
 *   type T3 = IValidNumber<123>;   // 123
 */
type IValidNumber<V extends IValidAsNumber> =
  V extends number ? V :
  IIsNumeric<`${V}`> extends never ? never : V
;

/**
 * Checks if a value is negative.
 * @example
 *   type T1 = _IIsNegative<-5>; // true
 *   type T2 = _IIsNegative<5>;  // false
 */
type _IIsNegative<T extends IValidAsNumber> = `${T}` extends `-${infer R}` ? true : false;

/**
 * Checks if a value is negative (only for valid numbers).
 * @example
 *   type T1 = IIsNegative<-5>; // true
 *   type T2 = IIsNegative<5>;  // false
 */
type IIsNegative<T extends IValidAsNumber> = 
  Abs<T> extends never ? never : _IIsNegative<T>
;

/**
 * Negates a number.
 * @example
 *   type T1 = _INegate<5>;   // '-5'
 *   type T2 = _INegate<-5>;  // '5'
 */
type _INegate<T extends IValidAsNumber> = `${T}` extends `-${infer R}` ? R : `-${T}`;

/**
 * Negates a number (only for valid numbers).
 * @example
 *   type T1 = INegate<5>;   // '-5'
 *   type T2 = INegate<-5>;  // '5'
 */
type INegate<T extends IValidAsNumber> = Abs<T> extends never ? never : _INegate<T>;

/**
 * Reverses the digits of a number or string.
 * @example
 *   type T = _IReverse<'123'>; // '321'
 */
type _IReverse<
  T extends IValidAsNumber,
  Acc extends string = ''
> = 
  `${T}` extends `${infer First}${infer Rest extends string}` ?
    _IReverse<Rest, `${First}${Acc}`> :
    Acc
;

/**
 * Reverses the digits of a number (absolute value).
 * @example
 *   type T = IReverse<-123>; // '321'
 */
type IReverse<T extends IValidAsNumber> = _IReverse<Abs<T>>;

/**
 * Counts the digits in a number or string.
 * @example
 *   type T = _IDigitCount<'123'>; // 3
 */
type _IDigitCount<
  V extends IValidAsNumber,
  Count extends any[] = []
> =
  `${V}` extends `${infer V}${infer Rest}` ? 
    _IDigitCount<Rest, [any, ...Count]> 
    : Count['length']
;

/**
 * Counts the digits in a number (absolute value).
 * @example
 *   type T = IDigitCount<-123>; // 3
 */
type IDigitCount<V extends IValidAsNumber> = _IDigitCount<Abs<V>>;

/**
 * Compares the digit count of two numbers or strings.
 * @example
 *   type T = _ICompareDigitCount<'12', '123'>; // -1
 */
type _ICompareDigitCount<
  A extends IValidAsNumber,
  B extends IValidAsNumber,
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

/**
 * Compares the digit count of two numbers.
 * @example
 *   type T = ICompareDigitCount<'12', '123'>; // -1
 */
type ICompareDigitCount<
  A extends IValidAsNumber, 
  B extends IValidAsNumber
> = _ICompareDigitCount<A, B>;

/**
 * Parses a string digit to a number.
 * @example
 *   type T = IParseDigit<'5'>; // 5
 */
type IParseDigit<T extends IStrDigit> =
  T extends `${infer D extends INumDigit}` ? D : T
;

/**
 * Compares two numbers of the same length, digit by digit.
 * @example
 *   type T = _ICompareSameLength<'123', '124'>; // -1
 */
type _ICompareSameLength<
  A extends IValidAsNumber,
  B extends IValidAsNumber
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

/**
 * Compares two absolute numbers by digit count and value.
 * @example
 *   type T = _ICompare<'123', '124'>; // -1
 */
type _ICompare<
  A extends IValidAsNumber,
  B extends IValidAsNumber
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

/**
 * Compares two numbers (string or number) by absolute value.
 * Returns -1, 0 or 1.
 * @example
 *   type T1 = ICompare<123, 124>; // -1
 *   type T2 = ICompare<-124, 123>; // 1
 *   type T3 = ICompare<123, 123>; // 0
 */
type ICompare<
  A extends IValidAsNumber,
  B extends IValidAsNumber
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
  IValidAsNumber as ValidAsNumber,
}