import { Compare } from "../interfaces/interfaces"
import { isNull } from "./object-utils"

/**
 * A utility namespace for mathematical operations.
 */
namespace MathUtils {
  /**
   * Calculates the average of a list of numbers.
   * @param numbers - The numbers to calculate the average of.
   * @returns The average of the input numbers.
   */
  export function getAvarage(...numbers: number[]): number {
    const total: number = numbers.reduce((p: number, c: number): number => p + c)
    return total / numbers.length
  }

  /**
   * Compares a value with optional minimum and maximum values.
   * @param value - The value to compare.
   * @param min - The minimum value. Optional.
   * @param max - The maximum value. Optional.
   * @returns -1 if the value is less than the minimum, 1 if the value is greater than the maximum, or 0 if the value is within the range.
   */
  export function betweenMinMax(value: number, min?: number, max?: number): Compare {
    return (
      !isNull(min) && value < min! ? -1 :
      !isNull(max) && value > max! ? 1 : 0
    )
  }

  /**
   * Ensures a value is within a specified range.
   * @param value - The value to clamp.
   * @param min - The minimum value.
   * @param max - The maximum value.
   * @returns The clamped value.
   */
  export function minMax(value: number, min: number, max: number): number{
    return Math.min(Math.max(value,min),max)
  }  

  /**
   * Divides a value by a list of values.
   * @param value - The value to divide.
   * @param divideValues - The values to divide by.
   * @returns The result of dividing the value by each of the divide values.
   */
  export function divide(value: number, ...divideValues: number[]): number{
    return [value, ...divideValues].reduce((p: number,c: number): number => 
      by10(p,"multiply") / by10(c,"multiply")
    )
  }

  /**
   * Multiplies a value by a list of values.
   * @param value - The value to multiply.
   * @param multiplyValues - The values to multiply by.
   * @returns The result of multiplying the value by each of the multiply values.
   */
  export function multiply(value: number, ...multiplyValues: number[]): number{
    return [value, ...multiplyValues].reduce((p: number,c: number): number => 
      (by10(p,"multiply") * by10(c,"multiply")) / 100
    )
  }

  /**
   * Adds a value to a list of values.
   * @param value - The value to add.
   * @param plusValues - The values to add to.
   * @returns The result of adding the value to each of the plus values.
   */
  export function plus(value: number, ...plusValues: number[]): number{
    return [value, ...plusValues].reduce((p: number,c: number): number => 
      by10(by10(p,"multiply") + by10(c,"multiply"), "divide")
    ) 
  }

  /**
   * Subtracts a list of values from a value.
   * @param value - The value to subtract from.
   * @param minusValues - The values to subtract.
   * @returns The result of subtracting each of the minus values from the value.
   */
  export function minus(value: number, ...minusValues: number[]): number{
    return [value, ...minusValues].reduce((p: number,c: number): number => 
      by10(by10(p,"multiply") - by10(c,"multiply"), "divide")
    ) 
  }

  /**
   * Helper function to multiply or divide a number by 10.
   * @param value - The value to operate on.
   * @param type - The type of operation ("multiply" or "divide").
   * @returns The result of the operation.
   */
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