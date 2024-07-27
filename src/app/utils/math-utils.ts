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
}

const {
  getAvarage,
  betweenMinMax,
} = MathUtils

export {
  MathUtils,
  getAvarage,
  betweenMinMax
}