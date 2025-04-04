import { by10, interpolate, isNull } from "../easy-use"
import { Compare } from "./interfaces/math-interfaces"

/**
 * A utility for mathematical operations.
 */
class MathUtils {
  /**
   * Helper function to multiply or divide a number by 10.
   * @param value - The value to operate on.
   * @param type - The type of operation ("multiply" or "divide").
   * @returns The result of the operation.
   */
  static by10(value: number, type: 'multiply'|'divide'): number{
    return type == "multiply" ? value*10 : value/10
  }

  /**
   * Calculates the average of a list of numbers.
   * @param numbers - The numbers to calculate the average of.
   * @returns The average of the input numbers.
   * @example
   * MathUtils.getAvarage(1, 2, 3, 4); // returns 2.5
   */
  static getAvarage(...numbers: number[]): number {
    const total: number = numbers.reduce((p: number, c: number): number => p + c)
    return total / numbers.length
  }

  /**
   * Compares a value with optional minimum and maximum values.
   * @param value - The value to compare.
   * @param min - The minimum value. Optional.
   * @param max - The maximum value. Optional.
   * @returns -1 if the value is less than the minimum, 1 if the value is greater than the maximum, or 0 if the value is within the range.
   * @example
   * MathUtils.betweenMinMax(5, 1, 10); // returns 0
   * MathUtils.betweenMinMax(0, 1, 10); // returns -1
   * MathUtils.betweenMinMax(15, 1, 10); // returns 1
   */
  static betweenMinMax(value: number, min?: number, max?: number): Compare {
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
   * @example
   * MathUtils.minMax(5, 1, 10); // returns 5
   * MathUtils.minMax(0, 1, 10); // returns 1
   * MathUtils.minMax(15, 1, 10); // returns 10
   */
  static minMax(value: number, min: number, max: number): number{
    return Math.min(Math.max(value,min),max)
  }  

  /**
   * Divides a value by a list of values.
   * @param value - The value to divide.
   * @param divideValues - The values to divide by.
   * @returns The result of dividing the value by each of the divide values.
   * @example
   * MathUtils.divide(100, 2, 5); // returns 10
   */
  static divide(value: number, ...divideValues: number[]): number{
    return [value, ...divideValues].reduce((p: number,c: number): number => 
      by10(p,"multiply") / by10(c,"multiply")
    )
  }

  /**
   * Multiplies a value by a list of values.
   * @param value - The value to multiply.
   * @param multiplyValues - The values to multiply by.
   * @returns The result of multiplying the value by each of the multiply values.
   * @example
   * MathUtils.multiply(2, 3, 4); // returns 24
   */
  static multiply(value: number, ...multiplyValues: number[]): number{
    return [value, ...multiplyValues].reduce((p: number,c: number): number => 
      (by10(p,"multiply") * by10(c,"multiply")) / 100
    )
  }

  /**
   * Adds a value to a list of values.
   * @param value - The value to add.
   * @param plusValues - The values to add to.
   * @returns The result of adding the value to each of the plus values.
   * @example
   * MathUtils.sum(1, 2, 3); // returns 6
   * MathUtils.sum(0.1,0.2); // returns exactly 0.3 instead of 0.300...4
   */
  static sum(value: number, ...plusValues: number[]): number{
    return [value, ...plusValues].reduce((p: number,c: number): number => 
      by10(by10(p,"multiply") + by10(c,"multiply"), "divide")
    ) 
  }

  /**
   * Subtracts a list of values from a value.
   * @param value - The value to subtract from.
   * @param minusValues - The values to subtract.
   * @returns The result of subtracting each of the minus values from the value.
   * @example
   * MathUtils.minus(10, 2, 3); // returns 5
   */
  static minus(value: number, ...minusValues: number[]): number{
    return [value, ...minusValues].reduce((p: number,c: number): number => 
      by10(by10(p,"multiply") - by10(c,"multiply"), "divide")
    ) 
  }

  /**
   * Simula o comportamento do operador % (módulo).
   * @param dividend - O número a ser dividido.
   * @param divisor - O número pelo qual será dividido.
   * @returns O restante da divisão (módulo).
   * @example
   * mod(10, 3); // retorna 1
   * mod(-10, 3); // retorna 2 (comportamento correto para números negativos)
   */
  static mod(dividend: number, divisor: number): number {
    return by10(by10(dividend, "multiply") % by10(divisor, "multiply"), "divide")
  }

  /**
   * Generates a random number between a minimum and maximum value.
   * @param min - The minimum value.
   * @param max - The maximum value.
   * @returns A random number between min and max.
   * @example
   * MathUtils.random(1, 10); // returns a random number between 1 and 10
   */
  static random(min: number, max: number): number {
    const withDecimal: boolean = min % 1 !== 0 || max % 1 !== 0
    const decimalsSize: number = Math.max(
      `${min}`.split(".")[1]?.length || 0,
      `${max}`.split(".")[1]?.length || 0
    )
    if (withDecimal) {
      return Number((Math.random() * (max - min) + min).toFixed(decimalsSize))
    } else{
      return Math.floor(Math.random() * (max - min) + min)
    }
  }

  /**
   * Interpolates a value between a list of values.
   * @param t - The interpolation factor (between 0 and 1).
   * @param values - The values to interpolate between.
   * @returns The interpolated value.
   * @example
   * MathUtils.interpolate(0.5, 0, 10); // returns 5
   */
  static interpolate(t: number, ...values: number[]): number {
    const n: number = values.length.minus(1);
    if (t >= 1) return values[n];
    const i: number = Math.floor(t.multiply(n));
    const a: number = values[i];
    const b: number = values[i.sum(1)];
    const localT: number = (t.minus(i.divide(n))).multiply(n);
    return MathUtils._interpolate(a, b, localT);
  }

  /**
   * Private helper function for interpolation.
   * @param a - The start value.
   * @param b - The end value.
   * @param t - The interpolation factor.
   * @returns The interpolated value.
   */
  private static _interpolate(a: number, b: number, t: number): number {
    return a.sum(b.minus(a).multiply(t));
  }

  /**
   * Calculates the remaining percentage of a value relative to a total value.
   * @param currentValue - The current value.
   * @param totalValue - The total value.
   * @returns The remaining percentage.
   * @example
   * MathUtils.remainPercentage(30, 100); // returns 0.7
   */
  static remainPercentage(currentValue: number, totalValue: number): number {
    return MathUtils.minus(1,MathUtils.divide(currentValue, totalValue))
  }

  static pow(value: number, ...values: number[]): number {
    return [value, ...values].reduce((p: number,c: number): number => 
      Math.pow(p,c)
    )
  }

  static transition(factor: number, columns: number): number[] {
    const value: number = interpolate(factor, 1, columns+1).minus(1)
    const percentage: number = (1).minus(value.mod(1))
    const idx: number = Math.floor(value) == columns ? 0 : Math.floor(value)
    const nextIdx: number = idx+1 >= columns ? 0 : idx+1 
    const array: number[] = new Array(columns).fill(0)
    array[idx] = percentage
    array[nextIdx] = (1).minus(percentage)
    return array
  }
} 

export {
  MathUtils,
}