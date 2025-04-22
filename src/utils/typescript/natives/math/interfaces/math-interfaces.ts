import { ValidNumber, BasicDigit, _IReverse, _ICompare, NumDigit } from "@ts-natives/number/interfaces/number-interfaces";
import { Never } from "src/utils/typescript/interfaces/misc-interfaces";
  
type IBy10Type = 'multiply'|'divide'

type IListCompare = [-1, 0, 1]

type ICompare = IListCompare[number]

type IBolleanCompare = boolean|null;

type IBooleanToCompare<T extends IBolleanCompare = Never> = 
  T extends true ? 1 :
  T extends false ? 0 :
  -1
;

type IAbs<T extends (number|string)> =
  `${T}` extends `-${infer R}` ? ValidNumber<R> :
  `${T}` extends `+${infer R}` ? ValidNumber<R> :
  ValidNumber<T>
;

type IDigitCompare<
  A extends BasicDigit,
  B extends BasicDigit
> = [
  [0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [1, 0,-1,-1,-1,-1,-1,-1,-1,-1],
  [1, 1, 0,-1,-1,-1,-1,-1,-1,-1],
  [1, 1, 1, 0,-1,-1,-1,-1,-1,-1],
  [1, 1, 1, 1, 0,-1,-1,-1,-1,-1],
  [1, 1, 1, 1, 1, 0,-1,-1,-1,-1],
  [1, 1, 1, 1, 1, 1, 0,-1,-1,-1],
  [1, 1, 1, 1, 1, 1, 1, 0,-1,-1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0,-1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
][A][B]

type IDigitSum<
  A extends BasicDigit,
  B extends BasicDigit
> = [
  [0, 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 ],
  [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10],
  [2, 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10, 11],
  [3, 4 , 5 , 6 , 7 , 8 , 9 , 10, 11, 12],
  [4, 5 , 6 , 7 , 8 , 9 , 10, 11, 12, 13],
  [5, 6 , 7 , 8 , 9 , 10, 11, 12, 13, 14],
  [6, 7 , 8 , 9 , 10, 11, 12, 13, 14, 15],
  [7, 8 , 9 , 10, 11, 12, 13, 14, 15, 16],
  [8, 9 , 10, 11, 12, 13, 14, 15, 16, 17],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
][A][B]

type IDigitSubtract<
  A extends BasicDigit,
  B extends BasicDigit,
> = [
  [0,-1,-2,-3,-4,-5,-6,-7,-8,-9],
  [1, 0,-1,-2,-3,-4,-5,-6,-7,-8],
  [2, 1, 0,-1,-2,-3,-4,-5,-6,-7],
  [3, 2, 1, 0,-1,-2,-3,-4,-5,-6],
  [4, 3, 2, 1, 0,-1,-2,-3,-4,-5],
  [5, 4, 3, 2, 1, 0,-1,-2,-3,-4],
  [6, 5, 4, 3, 2, 1, 0,-1,-2,-3],
  [7, 6, 5, 4, 3, 2, 1, 0,-1,-2],
  [8, 7, 6, 5, 4, 3, 2, 1, 0,-1],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
][A][B]

type IDigitSumCarry<
  A extends BasicDigit,
  B extends BasicDigit,
  Carry extends BasicDigit = 0 
> =
  IDigitSum<A,B> extends infer ABResult extends number ?
  ABResult extends NumDigit ?
    IDigitSum<ABResult, Carry> extends infer SumResult extends number ?
      SumResult extends NumDigit ? 
        [SumResult, 0]:
      `${SumResult}` extends `${infer CarryResult extends BasicDigit}${infer Result extends BasicDigit}` ?
        [Result, CarryResult] :
      never :
    never :
    `${ABResult}` extends `${infer CarryResult extends BasicDigit}${infer ABRightResult extends BasicDigit}` ? 
      IDigitSum<ABRightResult, Carry> extends infer SumResult extends number ?
        SumResult extends NumDigit ?
          [SumResult, CarryResult] :
        `${SumResult}` extends `${infer CarryResult2 extends BasicDigit}${infer Result extends BasicDigit}` ?
          [Result, IDigitSum<CarryResult, CarryResult2>] :
        never :
      never :
    never :
  never
;

type _Sum<
  A extends (number|string),
  B extends (number|string),
  C extends BasicDigit = 0,
> =
  `${A}` extends `${infer AD extends BasicDigit}${infer ARest}` ?
  `${B}` extends `${infer BD extends BasicDigit}${infer BRest}` ?
    IDigitSumCarry<AD,BD,C> extends infer SumRes extends any[] ?
      `${SumRes[0]}${_Sum<ARest, BRest, SumRes[1]>}` :
    never:
    IDigitSumCarry<AD,C> extends infer SumRes extends any[] ?
      `${SumRes[0]}${_Sum<ARest, B, SumRes[1]>}` :
    never:
  C extends 0 ? '' : `${C}`
;

type Sum<
  A extends (number|string),
  B extends (number|string),
> =
  _ICompare<A, B> extends infer CRes ?
  _IReverse<A> extends infer ARev extends string ?
  _IReverse<B> extends infer BRev extends string ?
    CRes extends -1 ? 
      _IReverse<_Sum<BRev,ARev>> :
      _IReverse<_Sum<ARev,BRev>> :
  never :
  never :
  never
;

export {
  IListCompare as ListCompare,
  ICompare as Compare,
  IBooleanToCompare as CompareResult,
  IBy10Type as By10Type,
  IDigitCompare as DigitCompare,
  IAbs as Abs,
  // ISubtract as Subtract, // Exportando o novo tipo
}