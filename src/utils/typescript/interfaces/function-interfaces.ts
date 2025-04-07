import { ArrayType } from "@utils/interfaces/array-interfaces";

/**
 * Tipo que representa uma função com tipos de argumentos e tipo de retorno especificados.
 * 
 * @example
 * type MyFunction = Function<[number, string], false, any, void>;
 * const fn: MyFunction = (num, str) => { console.log(num, str); };
 */
type IFunction<
  Types extends any[] = any[],
  Inf extends boolean = false,
  InfType = any,
  RType = void
> = (...args: ArrayType<Types, Inf, InfType>) => RType

/**
 * Tipo que altera o tipo de retorno de uma função.
 * 
 * @template Func - O tipo da função
 * @template NewReturnType - O novo tipo de retorno
 * 
 * @example
 * type OriginalFunction = (a: number, b: string) => boolean;
 * type ModifiedFunction = ModifyReturnType<OriginalFunction, void>; // (a: number, b: string) => void
 */
type IModifyReturnType<Func extends (...args: any) => any, NewReturnType> = 
  Func extends (...args: infer Args) => any ? (...args: Args) => NewReturnType : never;

/**
 * Obtém os parâmetros de um tipo de função em uma tupla.
 * 
 * @example
 * type ParametersExample = Parameters<(a: number, b: string) => void> //[a: number, b: string]
 */
type _IParameters<T extends (...args: any) => any> = Parameters<T>;

/**
 * Obtém os parâmetros de um tipo de função construtora em uma tupla.
 * 
 * @example
 * type ConstructorParametersExample = _ConstructorParameters<new (a: number, b: string) => void>; // [number, string]
 */
type _IConstructorParameters<T extends abstract new (...args: any) => any> = ConstructorParameters<T>;

/**
 * Obtém o tipo de retorno de um tipo de função.
 * 
 * @example
 * type ReturnTypeExample = _ReturnType<() => string>; // string
 */
type _IReturnType<T extends (...args: any) => any> = ReturnType<T>;

/**
 * Obtém o tipo de retorno de um tipo de função construtora.
 * 
 * @example
 * type InstanceTypeExample = _InstanceType<new () => { a: number }>; // { a: number }
 */
type _IInstanceType<T extends abstract new (...args: any) => any> = InstanceType<T>;

export { 
  IFunction as Function, 
  IModifyReturnType as ModifyReturnType, 
  _IParameters as Parameters, 
  _IReturnType as ReturnType, 
  _IInstanceType as InstanceType, 
  _IConstructorParameters as ConstructorParameters,
}
