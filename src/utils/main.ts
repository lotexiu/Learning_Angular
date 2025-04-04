import { divide, minus, multiply, sum, strCapitalize, strCapitalizeAll, mod } from "./easy-use"

declare global {
  interface Number {
    hasDecimals(): boolean
    getDecimals(): number|undefined
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
Number.prototype.sum = function(...plusValues:number[]): number {
  return sum(this as number, ...plusValues)
}
Number.prototype.minus = function(...minusValues:number[]): number {
  return minus(this as number, ...minusValues)
}
Number.prototype.mod = function(value: number): number {
  return mod(this as number, value)
}

String.prototype.capitalize = function(): string {
  return strCapitalize(this as string)
}
String.prototype.capitalizeAll = function(split: string): string {
  return strCapitalizeAll(this as string, split)
}