import { Nullable } from "@ts-interfaces/misc-interfaces";
import { Class } from "@ts-natives/class/model/class";
import { cLog } from "@ts-natives/console/console-utils";
import { DeepPartial, Object } from "@ts-natives/object/interfaces/object-interfaces";
import { isNull } from "@ts-natives/object/object-utils";
import { MASK_KEYS } from "../constants/mask-keys";

type MinMax = Object<{
  min: Nullable<number>;
  max: Nullable<number>;
}>

abstract class BaseMask extends Class {
  quantity: MinMax = {max:1, min:1} as MinMax;
  optional: boolean = false;

  protected quantityMask(): string {
    const { min, max } = this.quantity;
    if (this.optional) {
      if (isNull(max, 0, 1)) return '?';
      return `{0,${max}}`;
    }
    if (isNull(min) && isNull(max)) return '*';
    if (min === max && !isNull(min)) {
      if (isNull(min, 0, 1)) return '';
      return `{${min}}`;
    }
    if (min === 1 && isNull(max, 0)) return '+';
    if (!isNull(min, 0, 1) && isNull(max, 0, 1)) return `{${min},}`;
    if (isNull(min, 0) && !isNull(max, 0, 1)) return `{0,${max}}`;
    return `{${min ?? 0},${max ?? 1}}`;
  }

  abstract result(): string

  mask(): string {
    if (this.quantity.min === 0 && this.quantity.max === 0) return '';
    return `(${this.result()})`+this.quantityMask()
  } 
}

class MaskBuilder extends BaseMask {
  masks: (MaskGroup|Mask)[] = [];

  add(value: MaskGroup|Mask): void {
    this.masks.push(value)
  }

  result(): string {
    return this.masks.map((children:BaseMask): string => children.mask()).join('|')
  }

  log(): void {
    cLog(this.mask())
  }

  static from(mask: string): MaskBuilder {
    const maskBuilder: MaskBuilder = new MaskBuilder();
    console.log(MASK_KEYS)
    // cLog(mask, MASK_KEYS);
    return maskBuilder;
  }
  
  static test(): void {
    const maskBuilder = new MaskBuilder();
    const configs: DeepPartial<Mask>[] = [
      { value: 'normal', quantity: { min: 1, max: 2 } },
      { value: 'optional', quantity: { min: undefined, max: 2 } },
      { value: 'any', quantity: { min: undefined, max: undefined } },
      { value: 'minimum', quantity: { min: 3, max: 0 } },
      { value: 'at least', quantity: { min: 1, max: 0 } },
    ];
    configs.forEach((cfg: DeepPartial<Mask>): void => {
      maskBuilder.add(new Mask().assign(cfg));
    });
    maskBuilder.log();
  }
}

class MaskGroup extends BaseMask {
  masks: (MaskGroup|Mask)[] = [];
  leftValues: (MaskGroup|Mask)[] = [];
  rightValues: (MaskGroup|Mask)[] = [];

  result(): string {
    let mask: string = ''
    mask += this.leftValues.map((children:BaseMask): string => children.mask()).join('')
    if (this.masks.length > 0 ) {
      mask += `(${this.masks.map((children:BaseMask): string => children.mask()).join('|')})`
    }
    mask += this.rightValues.map((children:BaseMask): string => children.mask()).join('')
    return mask
  }
}

class Mask extends BaseMask{
  value: string = '';
  leftValues: (MaskGroup|Mask)[] = [];
  rightValues: (MaskGroup|Mask)[] = [];

  result(): string {
    let mask: string = ''
    mask += this.leftValues.map((children:BaseMask): string => children.mask()).join('')
    mask += this.value
    mask += this.rightValues.map((children:BaseMask): string => children.mask()).join('')
    return mask
  }
}

export {
  MinMax,
  MaskBuilder,
  MaskGroup,
  Mask
}