﻿import { Extract } from "@ts-natives/interfaces";

/**
 * Type representing `null` or `never`.
 */
type INever<T extends null|never = null> = T;
// type INever<T extends null|never = null> = T;

/**
 * Type that allows `null` or `undefined` in addition to the specified type.
 * 
 * @example
 * type NullableString = Nullable<string>; // string | null | undefined
 */
type INullable<
  Type=any,
  NoVoid extends boolean = false
> = NoVoid extends false ?
  Type | undefined | null | void :
  Type | undefined | null;

type INotUndefined<T> = T extends undefined ? never : T;

type IExtends<T, U, _nv extends INever=INever> = T extends U ? T&U : never;

type IConstructor<T> = new (...args: any[]) => T;

type IPrototype<T> = {
  constructor: IConstructor<T>;
} ;

type IAnyClass<T=null> = 
  T extends null ?
    IConstructor<any> & Function & NewableFunction:
    IConstructor<T> & Function & NewableFunction & T;

type IAnyType = Function;

type IAnyValue<T=any> = T & Object

type IIs<T,U> = Extract<T,U> extends never ? false : true;

export { 
  INever as Never, 
  INullable as Nullable,
  INotUndefined as NotUndefined,
  IExtends as Extends,
  IConstructor as Constructor,
  IAnyClass as AnyClass,
  IAnyType as AnyType,
  IAnyValue as AnyValue,
  IIs as Is,
  IPrototype as Prototype,
}
