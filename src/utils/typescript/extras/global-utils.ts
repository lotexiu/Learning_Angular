import { ClipboardUtils } from "../html/clipborad/clipboard-utils";
import { HTMLUtils } from "../html/html-utils";
import { ConsoleUtils } from "../natives/console/console-utils";
import { divide, MathUtils, minus, mod, multiply, sum } from "../natives/math/math-utils";
import { KeyOf, GetTypeFromKey, Constructor } from "../natives/object/interfaces/object-interfaces";
import { ObjectUtils } from "../natives/object/object-utils";
import { RegexUtils } from "../natives/regex/regex-utils";
import { strCapitalize, strCapitalizeAll, StringUtils } from "../natives/string/string-utils";
import { GenericUtils } from "./generic-utils";
import { Timer } from "./timer/timer";


class GlobalUtils  {
  static registerMethod<T, Key extends KeyOf<T>>(
    constructor: Constructor<T>, 
    name: Key, 
    handler: GetTypeFromKey<T,Key>
  ): void {
    constructor.prototype[name] = handler
  }
}

/* Adding Class into Windows */

const utilsClasses: Function[] = [
  // ComponentUtils,
  ClipboardUtils,
  HTMLUtils,
  MathUtils,
  RegexUtils,
  ConsoleUtils,
  GenericUtils,
  ObjectUtils,
  StringUtils,
  Timer,
];

utilsClasses.forEach((utilsClass) => {
  (window as any)[utilsClass.name.replaceAll("_","")] = utilsClass;
  // Object.getOwnPropertyNames(utilsClass).forEach((key: string): void => {
  //   if (typeof utilsClass[key] === 'function') {
  //     utilsClass[key] = utilsClass[key].bind(utilsClass);
  //   }
  // });
})

/* Declarations */

declare global {
  interface Number extends String {
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
  }
  interface String {
    capitalize(): string;
    capitalizeAll(split: string): string;
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
  return divide(this, ...divideValues)
})
GlobalUtils.registerMethod(Number, "multiply", function(this: number, ...multiplyValues:number[]): number {
  return multiply(this, ...multiplyValues)
})
GlobalUtils.registerMethod(Number, "sum", function(this: number, ...plusValues:number[]): number {
  return sum(this, ...plusValues)
})
GlobalUtils.registerMethod(Number, "minus", function(this: number, ...minusValues:number[]): number {
  return minus(this, ...minusValues)
})
GlobalUtils.registerMethod(Number, "mod", function(this: number, value: number): number {
  return mod(this, value)
})

GlobalUtils.registerMethod(Number, "/", function(this: number, ...divideValues:number[]): number {
  return divide(this, ...divideValues)
})
GlobalUtils.registerMethod(Number, "*", function(this: number, ...multiplyValues:number[]): number {
  return multiply(this, ...multiplyValues)
})
GlobalUtils.registerMethod(Number, "+", function(this: number, ...plusValues:number[]): number {
  return sum(this, ...plusValues)
})
GlobalUtils.registerMethod(Number, "-", function(this: number, ...minusValues:number[]): number {
  return minus(this, ...minusValues)
})
GlobalUtils.registerMethod(Number, "%", function(this: number, value: number): number {
  return mod(this, value)
})

GlobalUtils.registerMethod(String, "capitalize", function(this: string): string {
  return strCapitalize(this)
})
GlobalUtils.registerMethod(String, "capitalizeAll", function(this: string, split: string): string {
  return strCapitalizeAll(this, split)
})

