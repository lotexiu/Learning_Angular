import { Compare } from "../interfaces/interfaces"
import { isNull } from "./object-utils"

namespace MathUtils {
  export function getAvarage(...numbers: number[]): number {
    const total: number = numbers.reduce((p: number, c: number): number => p + c)
    return total / numbers.length
  }
  export function betweenMinMax(value: number, min?: number, max?: number): Compare {
    return (
      !isNull(min) && value < min! ? -1 :
      !isNull(min) && value > max! ? 1 : 0
    )
  }
  export function minMax(value: number, min: number, max: number): number{
    return Math.min(Math.max(value,min),max)
  }
  export function divide(value: number, ...divideValues: number[]): number{
    return [value, ...divideValues].reduce((p: number,c: number): number => 
      by10(p,"multiply") / by10(c,"multiply")
    )
  }
  export function multiply(value: number, ...multiplyValues: number[]): number{
    return [value, ...multiplyValues].reduce((p: number,c: number): number => 
      (by10(p,"multiply") * by10(c,"multiply")) / 100
    )
  }
  export function plus(value: number, ...plusValues: number[]): number{
    return [value, ...plusValues].reduce((p: number,c: number): number => 
      by10(by10(p,"multiply") + by10(c,"multiply"), "divide")
    ) 
  }
  export function minus(value: number, ...minusValues: number[]): number{
    return [value, ...minusValues].reduce((p: number,c: number): number => 
      by10(by10(p,"multiply") - by10(c,"multiply"), "divide")
    ) 
  }
  function by10(value: number, type: 'multiply'|'divide'): number{
    return type == "multiply" ? value*10 : value/10
  }
} 

const {
  getAvarage,
  betweenMinMax,
  minMax,
  divide,
  minus,
  multiply,
  plus
} = MathUtils

export {
  MathUtils,
  getAvarage,
  betweenMinMax,
  minMax,
  divide,
  minus,
  multiply,
  plus
}