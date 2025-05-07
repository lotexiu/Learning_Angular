import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { ClipboardUtils } from "../html/clipborad/clipboard-utils";
import { HTMLUtils } from "../html/html-utils";
import { ConsoleUtils } from "../natives/console/console-utils";
import { mathDivide, MathUtils, mathMinus, mathMod, mathMultiply, mathSum } from "../natives/math/math-utils";
import { GetTypeFromKey, BetterClassAssign } from "../natives/object/interfaces/object-interfaces";
import { ObjectUtils } from "../natives/object/object-utils";
import { RegexUtils } from "../natives/regex/regex-utils";
import { strCapitalize, strCapitalizeAll, StringUtils } from "../natives/string/string-utils";
import { GenericUtils } from "./generic-utils";
import { Timer } from "./timer/timer";
import { ClassUtils } from "@ts-natives/class/class-utils";
import { Class } from "@ts-natives/class/model/class";
import { RegistryUtils } from "./registry/registry-utils";
import { AnyClass, Constructor } from "@ts-interfaces/misc-interfaces";
import { RegistryClass } from "./registry/model/registry-classes";


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
  }
  interface String {
    capitalize(): string;
    capitalizeAll(split: string): string;
  }

  interface Object {
    assign<T extends object>(...values: Partial<BetterClassAssign<T>>[]): T;
    copy(): this;
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
  return mathDivide(this, ...divideValues)
})
GlobalUtils.registerMethod(Number, "multiply", function(this: number, ...multiplyValues:number[]): number {
  return mathMultiply(this, ...multiplyValues)
})
GlobalUtils.registerMethod(Number, "sum", function(this: number, ...plusValues:number[]): number {
  return mathSum(this, ...plusValues)
})
GlobalUtils.registerMethod(Number, "minus", function(this: number, ...minusValues:number[]): number {
  return mathMinus(this, ...minusValues)
})
GlobalUtils.registerMethod(Number, "mod", function(this: number, value: number): number {
  return mathMod(this, value)
})

GlobalUtils.registerMethod(Number, "/", function(this: number, ...divideValues:number[]): number {
  return mathDivide(this, ...divideValues)
})
GlobalUtils.registerMethod(Number, "*", function(this: number, ...multiplyValues:number[]): number {
  return mathMultiply(this, ...multiplyValues)
})
GlobalUtils.registerMethod(Number, "+", function(this: number, ...plusValues:number[]): number {
  return mathSum(this, ...plusValues)
})
GlobalUtils.registerMethod(Number, "-", function(this: number, ...minusValues:number[]): number {
  return mathMinus(this, ...minusValues)
})
GlobalUtils.registerMethod(Number, "%", function(this: number, value: number): number {
  return mathMod(this, value)
})

GlobalUtils.registerMethod(String, "capitalize", function(this: string): string {
  return strCapitalize(this)
})
GlobalUtils.registerMethod(String, "capitalizeAll", function(this: string, split: string): string {
  return strCapitalizeAll(this, split)
})

GlobalUtils.registerMethod(Object, "assign", 
  function<T extends object>(this: T, ...values: Partial<BetterClassAssign<T>>[]): T {
    RegistryUtils.assignObject(this as any, ...values)
    return this
  }
)

/* Registry Class */
const utilsClasses: AnyClass[] = [
  GlobalUtils,
  ClipboardUtils,
  HTMLUtils,
  MathUtils,
  RegexUtils,
  ConsoleUtils,
  GenericUtils,
  ObjectUtils,
  StringUtils,
  Timer,
  Class,
  ClassUtils,
];
utilsClasses.forEach((utilsClass: AnyClass): void => {
  RegistryUtils.getOrAddRegistryClass(utilsClass)
})

