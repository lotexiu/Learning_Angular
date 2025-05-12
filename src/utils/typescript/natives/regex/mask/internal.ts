import { isNull } from "@ts-natives/object/object-utils"
import { Mask, MaskBuilder, MaskGroup } from "./model/mask-builder"

function findMaskKeyConflicts(keys: string[]): void {
  const conflicts: Array<{ shorter: string, longer: string }> = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (i === j) continue;
      const a = keys[i];
      const b = keys[j];
      if (b.startsWith(a) && b !== a.repeat(b.length / a.length)) {
        const suffix = b.slice(a.length);
        if (suffix && keys.includes(suffix)) {
          conflicts.push({ shorter: a, longer: b });
        }
      }
    }
  }
  if (conflicts.length > 0) {
    throw new Error(
      '[MASK_KEYS] Conflict(s) detected between mask keys: ' +
      JSON.stringify(conflicts, null, 2)
    );
  }
}

function numberMask(integerDigits?: number, fractionDigits?: number): MaskBuilder {
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
    const rest: number = integerDigits!.trunc()["%"](3)
    const groupAmount: number = integerDigits!["/"](3).trunc()["-"](rest == 0 ? 1 : 0)

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

export const _Mask = {
  findMaskKeyConflicts,
  numberMask
};
