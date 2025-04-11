import { BuildArray } from "@utils/interfaces/array-interfaces";
import { _ } from "node_modules/@angular/cdk/number-property.d-1067cb21";


type Number<V> = V extends number ? V & number : never;

type _DArray<
  Length extends string | number,
  Acc extends any[] = [],
> = `${Acc['length']}` extends `${Length}` ? Acc : _DArray<Length, [...Acc, any]>;

type _DIsNegative<T extends string> =
  T extends `-${string}` ? true : false;
  
type DIsNegative<T extends number> = _DIsNegative<`${T}`>;

type DNegate<T extends (number|string)> =
  `${T}` extends `-${infer R}` ? Number<R> : Number<`-${T}`>;

type DAbs<T extends number> =
  `${T}` extends `-${infer R}` ? R : `${T}`;

type _DAdd<A extends (number|string), B extends (number|string)> =
  [..._DArray<A>, ..._DArray<B>]['length']
;

type _DSubtract<A extends number, B extends number> =
  _DArray<A> extends [..._DArray<B>, ...infer Rest]
    ? Rest['length']
    : never
;

type _DGreaterThan<A extends number, B extends number> =
  _DArray<A> extends [..._DArray<B>, ...infer _]
    ? true
    : false
;


// _DAdd<DAbs<A>, DAbs<B>> extends infer V ?
type DMerge<A extends number, B extends number> =
  DIsNegative<A> extends true ?
    DIsNegative<B> extends true ?
      DNegate<Number<_DAdd<DAbs<A>, DAbs<B>>>> :
    never:
  never
      
  
  // DIsNegative<A> extends DIsNegative<B>
  //   ? DIsNegative<A> extends true
  //     ? DNegate<Number<_DAdd<DAbs<A>, DAbs<B>>>>
  //     : _DAdd<A, B>
  //   : _DGreaterThan<Number<DAbs<A>>, Number<DAbs<B>>> extends true
  //     ? DIsNegative<A> extends true
  //       ? DNegate<_DSubtract<Number<DAbs<A>>, Number<DAbs<B>>>>
  //       : _DSubtract<Number<DAbs<A>>, Number<DAbs<B>>>
  //     : DIsNegative<B> extends true
  //       ? DNegate<_DSubtract<Number<DAbs<B>>, Number<DAbs<A>>>>
  //       : _DSubtract<Number<DAbs<B>>, Number<DAbs<A>>>
;

type A = DMerge<-2,-5>
      