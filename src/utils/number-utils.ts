/**
 * A utility namespace for number-related operations.
 */
namespace NumberUtils {
  /**
   * Generates a random number within a specified range, taking into account decimal places.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns A random number within the specified range, rounded to the maximum number of decimal places found in either the minimum or maximum value.
   */
  export function random(min: number, max: number): number {
    const minDecimals: string = min.getDecimals()?.toString() || ''
    const maxDecimals: string = max.getDecimals()?.toString() || ''
    let decimalsSize: number = Math.max(minDecimals.length, maxDecimals.length)
    const range: number = (max).minus(min);
    const randomNumber: number = Math.random() * range + min;
    return decimalsSize ? Number(randomNumber.toFixed(decimalsSize)) : Math.round(randomNumber);
  }
}

const {
  random,
} = NumberUtils

export {
  NumberUtils,
  random,
}