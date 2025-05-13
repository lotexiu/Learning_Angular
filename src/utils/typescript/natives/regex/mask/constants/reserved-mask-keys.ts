// import { Mask } from "../model/mask-builder";
// import { MaskKey } from "../model/mask-key";

import { Class } from "@ts-natives/class/model/class";
import { DeepPartial } from "@ts-natives/object/interfaces/object-interfaces";
import { isNull } from "@ts-natives/object/object-utils";
import { RegexUtils } from "@ts-natives/regex/regex-utils";

class RegexKey extends Class {
  key?: string | string[];
  args?: string[];
  regex?: any;

  constructor(data?: DeepPartial<RegexKey>) {
    super();
    this.assign(data as DeepPartial<this>);
  }

  /**
   * Returns a regex string that matches any of the keys for this RegexKey instance.
   * Dynamically builds the regex based on the registered keys and replaces args by regArg.
   */
  get regexKey(): string {
    if (!this.key) return '';
    const keys: string[] = Array.isArray(this.key) ? this.key : [this.key];
    const regArg = '(?:\\\\,|[^,])+';
    return keys.map((key: string): string => {
      let pattern: string = RegexUtils.escapeRegexChars(key);      
      if (this.args) {
        this.args.forEach((arg: string): void => {
          pattern = pattern.replace(new RegExp(arg, 'g'), regArg);
        });
      }
      return pattern
    }).join('|');
  }
}

const regexAmount = new RegexKey({
  key: ['?','*','+','{n}','{n,}','{n,m}'],
  args: ['n', 'm'],
  regex: (key: string, n?: any, m?: any): string => {
    if (!isNull(n)) {
      if([n, m].map(Number).some(v=> isNaN(v))) {
        throw new Error(`Invalid regex key: ${key} with n: ${n} and m: ${m}`)
      }
    }
    return key
  }
})

/* TODO - Usar depois 
const behind = new RegexKey({
  key: ['<', '<!'], 
  regex: {
    '<':'?<=',
    '<!':'?<!'
  }
})
const ahead = new RegexKey({
  key: ['>', '!>'], 
  regex: {
    '>':'?=',
    '!>':'?<!'
  }
})
*/

export {
  regexAmount,
}