import { divide, minus, multiply, plus, strCapitalize, strCapitalizeAll } from "./easy-use"

declare global {
  interface Number {
    hasDecimals(): boolean
    getDecimals(): number|undefined
    divide(...divideValues:number[]): number
    multiply(...multiplyValues:number[]): number
    plus(...plusValues:number[]): number
    minus(...minusValues:number[]): number

  }
  interface String {
    capitalize(): string;
    capitalizeAll(split: string): string;
  }

}

Number.prototype.hasDecimals = function(): boolean {
  return this.toFixed(0) != this.toString()
}
Number.prototype.getDecimals = function(): number|undefined {
  let decimals: string = this.toString().split('.')[1]
  return Number(decimals) || undefined
}

Number.prototype.divide = function(...divideValues:number[]): number {
  return divide(this as number, ...divideValues)
}
Number.prototype.multiply = function(...multiplyValues:number[]): number {
  return multiply(this as number, ...multiplyValues)
}
Number.prototype.plus = function(...plusValues:number[]): number {
  return plus(this as number, ...plusValues)
}
Number.prototype.minus = function(...minusValues:number[]): number {
  return minus(this as number, ...minusValues)
}

String.prototype.capitalize = function(): string {
  return strCapitalize(this as string)
}
String.prototype.capitalizeAll = function(split: string): string {
  return strCapitalizeAll(this as string, split)
}