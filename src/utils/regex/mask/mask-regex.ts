import { LockedParams, Nullable } from "src/utils/interfaces/interfaces";
import { isNull } from "src/utils/object-utils";
import { RegexPatterns, removeCharsExcept, formatNumber, MaskRegexPatterns, RegexUtils } from "src/utils/regex/regex-utils";
import { countMissingCharsBeforeIndex, getAddedCharacters, getFirstDifferentIndex, getRemovedCharacters, removeCharacters, removeNearestPatternFromIndex } from "src/utils/string-utils";

class MaskRegex {
  static get rules(): any {
    return {
      '0': RegexPatterns.Digit,
      'A': RegexPatterns.LetterOrDigit,
      'S': RegexPatterns.Letter,
      'U': RegexPatterns.UppercaseLetter,
      'L': RegexPatterns.LowercaseLetter,
      '!': RegexPatterns.SpecialChar,
      '.': '[.]',
      ',': '[,]',
      '@': '@',
      'X': '[\\s\\S]',
    }
  };

  static get rulesRegex() {
    const ruleKeys = Object.keys(this.rules).join('');
    const {
      NegativeLookbehind, 
      Digit
    } = RegexPatterns

    return new RegExp(
      `(${NegativeLookbehind}\\\\)`+
      `([${ruleKeys}])`+
      `({${Digit}+})?`+
      `([*?])?`, 
      'g'
    );
  }

  static parseToRegexParts(mask: string) {
    const matches = mask.match(this.rulesRegex)!;
    return matches.map(match => {
      const ruleRegex = this.rules[match[0]];
      const restOfMatch = match.slice(1);
      if (match.endsWith('?')) {
        return `(${ruleRegex}${restOfMatch.slice(0, -1)})?`;
      } else if (match.endsWith('*')) {
        return `(${ruleRegex}+)`;
      } else {
        return `(${ruleRegex}${restOfMatch})`;
      }
    });
  }

  private static generateReversedRegex(mask: string): string {
    const regexList: string[] = this.parseToRegexParts(mask);
    const format: string = this.getFormat(mask);

    let regexReversedParts: string[][];

    let previousPos = 0
    regexReversedParts = regexList.map((pattern, index) => {
      const pos = format.indexOf(`$${index + 1}`);      
      const nextPos = format.indexOf(`$${index + 2}`) == -1 ? format.length : format.indexOf(`$${index + 2}`);
      const leftFormatRegexPart: string = format.slice(previousPos, pos).split('').map(char => `[${char}]`).join('');
      const rightFormatRegexPart: string = format.slice(pos + 2, nextPos).split('').map(char => `[${char}]`).join('');
      previousPos = pos + 2;
      return [
        isNull(leftFormatRegexPart,'') ? '' : `${index==0?'^':''}${leftFormatRegexPart}(?=${pattern})`,
        isNull(rightFormatRegexPart,'') ? '' : `${index==0?`(?<=${pattern})`:''}${rightFormatRegexPart}`,
      ]
    })
    
    previousPos = 0
    const cumulativeRegexParts: string[][] = regexReversedParts.map((part, index) => {
      const pos = format.indexOf(`$${index + 1}`);
      const nextPos = format.indexOf(`$${index + 2}`) == -1 ? format.length : format.indexOf(`$${index + 2}`);
      const leftFormatRegexPart: string = format.slice(previousPos, pos).split('').map(char => `[${char}]`).join('');
      const rightFormatRegexPart: string = format.slice(pos + 2, nextPos).split('').map(char => `[${char}]`).join('');
      previousPos = pos + 2;
      return [
        `${leftFormatRegexPart}${regexList[index]}`,
        `${index==0?`${regexList[index]}`:''}${rightFormatRegexPart}${regexList[index+1]||''}`,
      ]
    })
    regexReversedParts = regexReversedParts.map((part, index) => {
      if (index > 0) {
        return [
          isNull(part[0],'') ? '' : `(?<=${cumulativeRegexParts.slice(0,index).map(p => p[0]).join('')})${part[0]}`,
          isNull(part[1],'') ? '' : `(?<=${cumulativeRegexParts.slice(0,index).map(p => p[1]).join('')})${part[1]}`,
        ]
      }
      return part
    })

    return regexReversedParts.map(
      part => part.filter(p => p.length > 0).join('|')
    ).filter(p => p.length > 0).join('|');
  }

  static getRegex(mask: string, reverse: boolean = false) {
    if (reverse) {
      return this.generateReversedRegex(mask)
    }
    return `${this.parseToRegexParts(mask).join('')}`;
  }

  static getFormat(mask: string) {
    let index = 1;
    return mask.replace(this.rulesRegex, (match) => {
      return `$${index++}`;
    }).replace(/\\(.)/g, '$1');
  }

  static applyMask(value: string, mask: string, separator: string = ''): string {
    const masks = mask.split(/(?<!\\)\|\|/).map(m => m.replace(/\\\|\|/g, '||'));
    for (const m of masks) {
      const regex = new RegExp(this.getRegex(m));
      if (regex.test(value)) {
        const result = value.replace(regex, this.getFormat(m));
        if (!isNull(separator, '')){
          if (!result.includes(separator)) {
            return result.replace(MaskRegexPatterns.Number, '$&'+RegexUtils.inverseSeparator(separator));
          }
          return result.replace(MaskRegexPatterns.NumberWithDecimal, '$&'+RegexUtils.inverseSeparator(separator));
        }
        return value.replace(regex, this.getFormat(m));
      }
    }
    return value;
  }

  static removeMask(value: string, mask: string, separator: string = '', previousValue: string = ''): string {
    let valueCopy = value;

    if (previousValue) {      
      let removedChars: string = getRemovedCharacters(previousValue, value);
      if (removedChars.length > 0) {
        let removedPosition = getFirstDifferentIndex(value, previousValue, value.length);
        valueCopy = valueCopy.slice(0, removedPosition) + removedChars + valueCopy.slice(removedPosition);
        valueCopy = this.removeMask(valueCopy, mask, separator);
        const missingChars: number = countMissingCharsBeforeIndex(
          valueCopy,
          this.removeMask(valueCopy, mask, separator),
          removedPosition
        )
        removedPosition -= missingChars;
        if (!valueCopy.includes(removedChars)) {
          const maskChars = getRemovedCharacters(this.applyMask(valueCopy, mask, separator), valueCopy)
          removedChars = removeCharacters(removedChars, maskChars)
        }
        valueCopy = removeNearestPatternFromIndex(valueCopy, removedChars, removedPosition)
      }

      const newChars: string = getAddedCharacters(previousValue, value);      
      if (newChars.length > 0) {
        let addedPosition: number = getFirstDifferentIndex(value, previousValue);
        valueCopy = removeNearestPatternFromIndex(valueCopy, newChars, addedPosition)        
        valueCopy = this.removeMask(valueCopy, mask, separator);

        const missingChars: number = countMissingCharsBeforeIndex(
          this.applyMask(valueCopy, mask, separator),
          this.removeMask(valueCopy, mask, separator),
          addedPosition
        )
        addedPosition -= missingChars;
        valueCopy = valueCopy.slice(0, addedPosition) + newChars + valueCopy.slice(addedPosition);
      }
    }

    if (!isNull(separator, '')) {
      if (value.includes(separator)) {
        const numbers: string = value.match(new RegExp(RegexPatterns.Number, 'g'))?.join('') || '';
        const decimals: string = value.match(new RegExp(RegexPatterns.Decimal))?.[0] || '';
        valueCopy = numbers + separator + decimals;
      } else {
        valueCopy = value.match(new RegExp(RegexPatterns.Digit, 'g'))?.join('') || '';
      }
    }

    const masks = mask.split(/(?<!\\)\|\|/).map(m => m.replace(/\\\|\|/g, '||'));
    for (const m of masks) {
      const regexStr = this.getRegex(m, true)
      const regexParts = regexStr.split(/(?<!\\)\|/g)

      let invalidRegex: boolean = false;
      for (const regexPart of regexParts) {
        const regex = new RegExp(regexPart,'g');
        invalidRegex = valueCopy.match(regex) === null;
        if (invalidRegex) {
          break;
        }
      }
      if (!invalidRegex) {
        const regex = new RegExp(regexStr,'g');
        valueCopy = valueCopy.replace(regex, '');
      }
    }
    return valueCopy;
  }

  static log(value: string, mask: string, separator: string = '', previousValue: string = '') {
    const valueWithoutMask = this.removeMask(value, mask, separator, previousValue);
    const masks = mask.split(/(?<!\\)\|\|/).map(m => m.replace(/\\\|\|/g, '||'));

    let log: any = {}

    log['value'] = value;
    log['mask'] = mask;
    for (const m of masks) {
      log[m] = {
        format: this.getFormat(m),
        regexParts: this.parseToRegexParts(m),
        regex: this.getRegex(m),
        regexReverse: this.getRegex(m, true),
      }
    }
    log['regexResult'] = this.applyMask(valueWithoutMask, mask, separator);
    log['regexReverseResult'] = this.removeMask(value, mask, separator);
    console.log(log);
  }
}

export {
  MaskRegex
};
