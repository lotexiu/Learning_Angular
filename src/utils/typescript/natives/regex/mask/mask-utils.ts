import { isNull } from "@ts-natives/object/object-utils"
import { Mask, MaskBuilder, MaskGroup } from "./mask-builder"

class MaskUtils {
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
    function buildDecimalPart(groupAmount?: number): MaskGroup {
      return new MaskGroup().assign({
        optional: true,
        rightValues: [
          new Mask().assign({
            value: '.000',
            quantity: {min: !isNull(groupAmount) ? 0 : null, max: groupAmount},
          }),
          new Mask().assign({
            value: '.',
            rightValues: [
              new Mask().assign({
                value: '0',
                quantity: {min:1, max: fractionDigits},
              })
            ]
          })
        ]
      })
    }

    function buildIntegerPart(value: number): Mask {
      return new Mask().assign({
        value: '0',
        quantity: {min: 1, max: value},
      })
    }

    let builder: MaskBuilder = new MaskBuilder()
    const defaultNumber: Mask = buildIntegerPart(3)

    if (!isNull(integerDigits, 0)) {
      const rest: number = integerDigits.trunc()["%"](3)
      const groupAmount: number = integerDigits["/"](3).trunc()["-"](rest == 0 ? 1 : 0)

      builder.add(new MaskGroup().assign({
        masks: [defaultNumber],
        rightValues: [buildDecimalPart(groupAmount == 1 ? 0 : groupAmount)]
      }))

      if (rest > 0) {
        builder.add(new MaskGroup().assign({
          masks: [buildIntegerPart(rest)],
          rightValues: [buildDecimalPart(groupAmount)]
        }))
      }
    } else {
      builder.add(new MaskGroup().assign({
        masks: [defaultNumber],
        rightValues: [buildDecimalPart()]
      }))
    }
    return builder
  }
}

export {
  MaskUtils,
}