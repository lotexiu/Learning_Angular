type INumber<V> = V extends number ? V & number : never;

type _DArray< /* Melhorar */
  Length extends string | number,
  Acc extends any[] = [],
> = `${Acc['length']}` extends `${Length}` ? Acc : _DArray<Length, [...Acc, any]>;

type _DIsNegative<T extends (number|string)> =
  `${T}` extends `-${infer R}` ? true : false;
  
type DIsNegative<T extends number> = _DIsNegative<`${T}`>;

type DNegate<T extends (number|string)> =
  `${T}` extends `-${infer R}` ? R : `-${T}`;

type DAbs<T extends (number|string)> =
  `${T}` extends `-${infer R}` ? R : `${T}`;

type _DAdd<
  A extends (number|string),
  B extends (number|string)
> =
  [..._DArray<A>, ..._DArray<B>]['length']
;

type _DSubtract<
  A extends (number|string),
  B extends (number|string)
> =
  _DArray<DAbs<A>> extends [..._DArray<DAbs<B>>, ...infer Rest]
    ? Rest['length']
    : never
;

type _DAbsGreaterThan<
  A extends (number|string),
  B extends (number|string)
> = _DArray<DAbs<A>> extends [..._DArray<DAbs<B>>, ...infer _]
  ? true
  : false
;

type _DAbsDecreaseBiggestValue<
  A extends (number|string),
  B extends (number|string)
> = _DAbsGreaterThan<A, B> extends true ?
  _DIsNegative<A> extends true ?
    DNegate<_DSubtract<A, B>> :
    _DSubtract<A, B> :
  _DIsNegative<B> extends true ?
    DNegate<_DSubtract<B, A>> :
    _DSubtract<B, A>
;

type _DMerge<A extends number, B extends number> =
  DIsNegative<A> extends true ?
    DIsNegative<B> extends true ?
      DNegate<INumber<_DAdd<DAbs<A>, DAbs<B>>>> :
    _DAbsDecreaseBiggestValue<A, B> :
  DIsNegative<B> extends true ?
    _DAbsDecreaseBiggestValue<A, B> :
  INumber<_DAdd<DAbs<A>, DAbs<B>>>
;

type DCalculate<
  A extends number,
  B extends number
> = _DMerge<A,B>
