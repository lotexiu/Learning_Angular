namespace NumberUtils {
  export function random(min: number, max: number): number {
    let decimalsSize = Math.max(min.getDecimals().length, max.getDecimals().length)
    const range: number = max - min;
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