import { ValidNumber, BasicDigit, _IReverse, _ICompare, _IDigitCount } from "@ts-natives/number/interfaces/number-interfaces";
import { Never } from "src/utils/typescript/interfaces/misc-interfaces";
  
type IDigitCompare<
  A extends BasicDigit,
  B extends BasicDigit
> = [
  [0,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
  [1, 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
  [1, 1 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
  [1, 1 , 1 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ],
  [1, 1 , 1 , 1 , 0 ,-1 ,-1 ,-1 ,-1 ,-1 ],
  [1, 1 , 1 , 1 , 1 , 0 ,-1 ,-1 ,-1 ,-1 ],
  [1, 1 , 1 , 1 , 1 , 1 , 0 ,-1 ,-1 ,-1 ],
  [1, 1 , 1 , 1 , 1 , 1 , 1 , 0 ,-1 ,-1 ],
  [1, 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 ,-1 ],
  [1, 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0 ]
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

type _ISum<
  A extends (number|string),
  B extends (number|string),
  C extends BasicDigit = 0,
> = 
  A extends `${infer AD extends BasicDigit}${infer ARest}` ?
  B extends `${infer BD extends BasicDigit}${infer BRest}` ?
    `${IDigitSum<AD,BD>}` extends `${infer SumRes}` ?
      SumRes extends `${infer SRes extends BasicDigit}${infer SRest extends BasicDigit}` ?
        `${IDigitSum<SRest,C>}` extends `${infer SumRes}` ?
          SumRes extends `${infer SRes2 extends BasicDigit}${infer SRest extends BasicDigit}` ?
            IDigitSum<SRes,SRes2> extends infer NewC extends BasicDigit ?
              'A' :
              'B' :
            `${SumRes}${_ISum<ARest, BRest, SRes>}` :
          never :
        SumRes extends BasicDigit ?
          `${IDigitSum<SumRes,C>}${_ISum<ARest, BRest, 0>}` :
          never:
      never:
  A extends BasicDigit ?
    `${IDigitSum<A,C>}` extends `${infer SumRes}` ?
      SumRes extends `${infer SRes extends BasicDigit}${infer SRest extends BasicDigit}` ?
        `${SRest}${_ISum<ARest, B, SRes>}` :
        SumRes:
      never:
    never:
  C extends 0 ? '' : `${C}`
;

type ISum<
  A extends (number|string),
  B extends (number|string),
> = 
  _ICompare<A, B> extends infer CRes ?
  _IReverse<A> extends infer ARev extends string ?
  _IReverse<B> extends infer BRev extends string ?
    CRes extends 1 ? _IReverse<_ISum<ARev,BRev>> :
    CRes extends 0 ? _IReverse<_ISum<ARev,BRev>> :
    CRes extends -1 ? _IReverse<_ISum<BRev,ARev>> :
    never :
  never :
  never :
  never
;

type R = ISum<111, 999>

export {
  IListCompare as ListCompare,
  ICompare as Compare,
  IBooleanToCompare as CompareResult,
  IBy10Type as By10Type,
  IDigitCompare as DigitCompare,
  IAbs as Abs,
}