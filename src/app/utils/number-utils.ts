namespace NumberUtils {
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