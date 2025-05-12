import { By10Type, Compare } from "./interfaces/math-interfaces";
import { _Math } from "./internal";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";

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
  static by10(value: number, type: By10Type): number {
    return _Math.by10(value, type);
  }

  /**
   * Calculates the average of a list of numbers.
   * @param numbers - The numbers to calculate the average of.
   * @returns The average of the input numbers.
   * @example
   * MathUtils.getAvarage(1, 2, 3, 4); // returns 2.5
   */
  static getAvarage(...numbers: number[]): number {
    return _Math.getAvarage(...numbers);
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
    return _Math.betweenMinMax(value, min, max);
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
  static minMax(value: number, min: number, max: number): number {
    return _Math.minMax(value, min, max);
  }  

  /**
   * Divides a value by a list of values.
   * @param value - The value to divide.
   * @param divideValues - The values to divide by.
   * @returns The result of dividing the value by each of the divide values.
   * @example
   * MathUtils.divide(100, 2, 5); // returns 10
   */
  static divide(value: number, ...divideValues: number[]): number {
    return _Math.divide(value, ...divideValues);
  }

  /**
   * Multiplies a value by a list of values.
   * @param value - The value to multiply.
   * @param multiplyValues - The values to multiply by.
   * @returns The result of multiplying the value by each of the multiply values.
   * @example
   * MathUtils.multiply(2, 3, 4); // returns 24
   */
  static multiply(value: number, ...multiplyValues: number[]): number {
    return _Math.multiply(value, ...multiplyValues);
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
  static sum(value: number, ...plusValues: number[]): number {
    return _Math.sum(value, ...plusValues);
  }

  /**
   * Subtracts a list of values from a value.
   * @param value - The value to subtract from.
   * @param minusValues - The values to subtract.
   * @returns The result of subtracting each of the minus values from the value.
   * @example
   * MathUtils.minus(10, 2, 3); // returns 5
   */
  static minus(value: number, ...minusValues: number[]): number {
    return _Math.minus(value, ...minusValues);
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
    return _Math.mod(dividend, divisor);
  }

  static hasDecimals(value: number): boolean {
    return _Math.hasDecimals(value);
  }

  static getDecimals(value: number): number | undefined {
    return _Math.getDecimals(value);
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
    return _Math.random(min, max);
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
    return _Math.interpolate(t, ...values);
  }

  /**
   * Private helper function for interpolation.
   * @param a - The start value.
   * @param b - The end value.
   * @param t - The interpolation factor.
   * @returns The interpolated value.
   */
  private static _interpolate(a: number, b: number, t: number): number {
    return a ["+"] ((b ["-"] (a)) ["*"] (t));
  }

  static pow(value: number, ...values: number[]): number {
    return _Math.pow(value, ...values);
  }

  static transition(factor: number, columns: number): number[] {
    return _Math.transition(factor, columns);
  }
}

export {
  MathUtils,
}

const { 
  random,
  getDecimals,
  hasDecimals,
  getAvarage, 
  betweenMinMax, 
  minMax, 
  multiply, 
  divide, 
  minus, 
  sum,
  mod, 
  pow,
  by10,
  interpolate,
} = MathUtils;

export {
  random as mathRandom,
  getDecimals as mathGetDecimals,
  hasDecimals as mathHasDecimals,
  getAvarage as mathGetAvarage,
  betweenMinMax as mathBetweenMinMax, 
  minMax as mathMinMax,
  multiply as mathMultiply, 
  divide as mathDivide,
  minus as mathMinus, 
  sum as mathSum,
  mod as mathMod, 
  pow as mathPow,
  by10 as mathBy10,
  interpolate as mathInterpolate,
}

RegistryUtils.getOrAddRegistryClass(MathUtils);