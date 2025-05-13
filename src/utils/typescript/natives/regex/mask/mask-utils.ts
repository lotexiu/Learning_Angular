import { MaskBuilder } from "./model/mask-builder"
import { _Mask } from "./internal"
import { MASK_KEYS } from "./constants/mask-keys"
import { MaskKey } from "./model/mask-key"
import { regexAmount } from "./constants/reserved-mask-keys";
import { RegexUtils } from "../regex-utils";

class MaskUtils {

  static get keyFinder(): RegExp {
    const keys: string = MASK_KEYS.map((maskKey: MaskKey): string =>RegexUtils.escapeRegexChars(maskKey.key)).join('|');
    return new RegExp(
    '(?<!\\\\)'+
    `(${keys})`+
    `(${regexAmount.regexKey})?`
    ,'g')
  }

  

  /**
   * Builds a mask for numbers with grouping and optional decimal places.
   *
   * @param integerDigits Number of digits to the left of the decimal separator (integer part).
   * @param fractionDigits Number of digits to the right of the decimal separator (fractional part).
   * @returns MaskBuilder instance representing the mask.
   *
   * @example
   * // 3 integer digits, 2 decimal digits: 999.99
   * MaskUtils.numberMask(3, 2)
   */
  static numberMask(integerDigits?: number, fractionDigits?: number): MaskBuilder  {
    return _Mask.numberMask(integerDigits, fractionDigits)
  }

  /**
   * Checks for conflicts between mask keys.
   * A conflict occurs when two keys exist such that one is a prefix of the other, but the longer key is not a direct repetition of the shorter key.
   * For example, keys 'A' and 'AB' are in conflict, but 'L' and 'LL' are not (since 'LL' is a repetition of 'L').
   */
  static findMaskKeyConflicts(keys: string[]): void {
    _Mask.findMaskKeyConflicts(keys)
  }
}

export {
  MaskUtils,
}