import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { DeepPartial, GetTypeFromKey } from "../natives/object/interfaces/object-interfaces";
import { Constructor } from "@ts-interfaces/misc-interfaces";
import { _String } from "@ts-natives/string/internal";
import { _Math } from "@ts-natives/math/internal";
import { RegistryUtils } from "./registry/registry-utils";


class GlobalUtils  {
  static registerMethod<T, Key extends KeyOf<T>>(
    constructor: Constructor<T>, 
    name: Key, 
    handler: GetTypeFromKey<T,Key>
  ): void {
    constructor.prototype[name] = handler
  }
}

/* Declarations */
declare global {
  interface Number {
    hasDecimals(): boolean
    getDecimals(): number|undefined

    /* Operators */
    "/"(...divideValues:number[]): number
    "*"(...multiplyValues:number[]): number
    "+"(...plusValues:number[]): number
    "-"(...minusValues:number[]): number
    "%"(value: number): number

    divide(...divideValues:number[]): number
    multiply(...multiplyValues:number[]): number
    sum(...plusValues:number[]): number
    minus(...minusValues:number[]): number
    mod(value: number): number
    trunc(): number
  }
  interface String {
    capitalize(): string;
    capitalizeAll(split: string): string;
  }

  interface Object {
    assign(...values: DeepPartial<this>[]): this;
    copy(): any;
  }

}

GlobalUtils.registerMethod(Number, "hasDecimals", function(this: number): boolean {
  return this.toFixed(0) != this.toString()
})
GlobalUtils.registerMethod(Number, "getDecimals", function(this: number): number|undefined {
  let decimals: string = this.toString().split('.')[1]
  return Number(decimals) || undefined
})

GlobalUtils.registerMethod(Number, "divide", function(this: number, ...divideValues:number[]): number {
  return _Math.divide(this, ...divideValues)
})
GlobalUtils.registerMethod(Number, "multiply", function(this: number, ...multiplyValues:number[]): number {
  return _Math.multiply(this, ...multiplyValues)
})
GlobalUtils.registerMethod(Number, "sum", function(this: number, ...plusValues:number[]): number {
  return _Math.sum(this, ...plusValues)
})
GlobalUtils.registerMethod(Number, "minus", function(this: number, ...minusValues:number[]): number {
  return _Math.minus(this, ...minusValues)
})
GlobalUtils.registerMethod(Number, "mod", function(this: number, value: number): number {
  return _Math.mod(this, value)
})

GlobalUtils.registerMethod(Number, "/", function(this: number, ...divideValues:number[]): number {
  return _Math.divide(this, ...divideValues)
})
GlobalUtils.registerMethod(Number, "*", function(this: number, ...multiplyValues:number[]): number {
  return _Math.multiply(this, ...multiplyValues)
})
GlobalUtils.registerMethod(Number, "+", function(this: number, ...plusValues:number[]): number {
  return _Math.sum(this, ...plusValues)
})
GlobalUtils.registerMethod(Number, "-", function(this: number, ...minusValues:number[]): number {
  return _Math.minus(this, ...minusValues)
})
GlobalUtils.registerMethod(Number, "%", function(this: number, value: number): number {
  return _Math.mod(this, value)
})
GlobalUtils.registerMethod(Number, "trunc", function(this: number): number {
  return Math.trunc(this)
})

GlobalUtils.registerMethod(String, "capitalize", function(this: string): string {
  return _String.capitalize(this)
})
GlobalUtils.registerMethod(String, "capitalizeAll", function(this: string, split: string): string {
  return _String.capitalizeAll(this, split)
})

GlobalUtils.registerMethod(Object, "assign", 
  function(this: object, ...values: DeepPartial<object>[]): object {
    RegistryUtils.assignObject(this as any, ...values)
    return this
  }
)

export {
  GlobalUtils
}

