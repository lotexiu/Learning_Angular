namespace MathUtils {
  export function getAvarage(...numbers: number[]): number {
    const total: number = numbers.reduce((p: number, c: number): number => p + c)
    return total / numbers.length
  }
}

const {
  getAvarage,
} = MathUtils

export {
  MathUtils,
  getAvarage,
}