import { LockType } from "../interfaces/interfaces";

class componentUtils {
  static digitToLetterMap: LockType<string, string> = {
    1: 'AKU',
    2: 'BLV',
    3: 'CMW',
    4: 'DNX',
    5: 'EOY',
    6: 'FPZ',
    7: 'GQ',
    8: 'HR',
    9: 'IS',
    0: 'JT',
  };

  static generateUniqueId(): string {
    const timeStamp: string = (new Date().getTime() / 2).toFixed(0);
    const random: number = numberUtils.random(1, 10000);
    let hash: string = '';
    `${timeStamp}${random}`.split("").forEach((number) => {
      let letters = this.digitToLetterMap[number]
      let result = numberUtils.random(0, letters!.length - 1)
      hash += letters![result]
    }
    )
    return hash
  }
}

class numberUtils {
  static random(min: number, max: number): number {
    let decimalsSize = Math.max(min.getDecimals().length, max.getDecimals().length)
    const range: number = max - min;
    const randomNumber: number = Math.random() * range + min;
    return decimalsSize ? Number(randomNumber.toFixed(decimalsSize)) : Math.round(randomNumber);
  }
}

export {
  componentUtils,
  numberUtils,
}