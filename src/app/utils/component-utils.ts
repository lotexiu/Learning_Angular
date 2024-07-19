import { LockedParams } from "../interfaces/interfaces";
import { NumberUtils } from "./number-utils";

class ComponentUtils {
  static digitToLetterMap: LockedParams<string, string> = {
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
    const timeStamp: string = (new Date().getTime()).toFixed(0);
    const random: number = NumberUtils.random(1, 1000000);
    let hash: string = '';
    `${timeStamp}${random}`.split("").forEach((number) => {
      let letters = this.digitToLetterMap[number]
      let result = NumberUtils.random(0, letters!.length - 1)
      hash += letters![result]
    }
    )
    return hash
  }
}

export {
  ComponentUtils
}