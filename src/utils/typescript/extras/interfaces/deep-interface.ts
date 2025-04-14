import { T } from "@angular/cdk/keycodes";
import { Abs, DigitCompare } from "@ts-natives/math/interfaces/math-interfaces";
import { BasicDigit, DigitCount, IsNegative } from "@ts-natives/number/interfaces/number-interfaces";

type _DSlowArray<
  Length extends string | number,
  Acc extends any[] = [],
> = 
  `${Acc['length']}` extends `${Length}` ?  Acc
  : _DSlowArray<Length, [...Acc, any]>
;





// type _ArrayIncrease<Arr extends any[]> = [...Arr, any, any, any]
// type _ArrayDecrease<Arr extends any[]> = Arr extends [any, any, ...infer Rest] ? Rest : never
// type _FastArray<
//   Length extends string | number,
//   Acc extends any[] = [],
// > =
//   `${Acc['length']}` extends `${Length}` ? 
//     Acc :
    
//   _FastArray<Length, [...Acc, any]>
// ;


// type _DAdd<
//   A extends (number|string),
//   B extends (number|string)
// > =
//   [..._DArray<A>, ..._DArray<B>]['length']
// ;

// type _DSubtract<
//   A extends (number|string),
//   B extends (number|string)
// > =
//   _DArray<DAbs<A>> extends [..._DArray<DAbs<B>>, ...infer Rest]
//     ? Rest['length']
//     : never
// ;

// type _DAbsGreaterThan<
//   A extends (number|string),
//   B extends (number|string)
// > = _DArray<DAbs<A>> extends [..._DArray<DAbs<B>>, ...infer _]
//   ? true
//   : false
// ;

// type _DAbsDecreaseBiggestValue<
//   A extends (number|string),
//   B extends (number|string)
// > = _DAbsGreaterThan<A, B> extends true ?
//   _DIsNegative<A> extends true ?
//     DNegate<_DSubtract<A, B>> :
//     _DSubtract<A, B> :
//   _DIsNegative<B> extends true ?
//     DNegate<_DSubtract<B, A>> :
//     _DSubtract<B, A>
// ;

// type _DMerge<A extends number, B extends number> =
//   DIsNegative<A> extends true ?
//     DIsNegative<B> extends true ?
//       DNegate<INumber<_DAdd<DAbs<A>, DAbs<B>>>> :
//     _DAbsDecreaseBiggestValue<A, B> :
//   DIsNegative<B> extends true ?
//     _DAbsDecreaseBiggestValue<A, B> :
//   INumber<_DAdd<DAbs<A>, DAbs<B>>>
// ;

// type DCalculate<
//   A extends number,
//   B extends number
// > = _DMerge<A,B>
