import { Nullable } from "src/utils/typescript/interfaces/misc-interfaces";
import { MaskRegex } from "./mask-regex";

class MaskValidationUtils {

  static validValue(value: string, mask: string, validatePart: Nullable<number[]> = null, separator: string = ''): boolean {
    value = MaskRegex.removeMask(value, mask, separator);
    let result: boolean = false;
    const masks: string[] = mask.split(/(?<!\\)\|\|/).map((m: string): string => m.replace(/\\\|\|/g, '||'));

    if (validatePart) {
      validatePart.forEach((idx: number): void => {
        const regex = new RegExp(MaskRegex.getRegex(masks[idx]));
        if (regex.test(value)) {
          result = true;
          return
        }
      })
    } else {
      masks.forEach((m: string): void => {
        const regex = new RegExp(MaskRegex.getRegex(m));
        console.log(regex)
        if (regex.test(value)) {
          result = true;
          return
        }
      })
    }
    return result
  }
}

export {
  MaskValidationUtils
}