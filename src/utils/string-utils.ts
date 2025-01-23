import { RegexUtils } from "./regex/regex-utils"

namespace StringUtils {

    /**
   * Removes all non-digit characters from a string.
   * @param value - The input string.
   * @returns The string with only digits.
   */
  export function onlyDigits(value: string): string {
    return RegexUtils.onlyDigits(value)
  }

  /**
  * Formats a phone number according to the Brazilian standard.
  * @param phone - The input phone number as a string.
  * @returns The formatted phone number.
  */
  export function formatPhone(phone: string) {
    return RegexUtils.formatPhone(phone)
  }

  /**
  * Validates an email address using a simple regex pattern.
  * @param email - The input email address as a string.
  * @returns True if the email is valid, false otherwise.
  */
  export function isValidEmail(email: string): boolean {
    return RegexUtils.isValidEmail(email)
  }

  /**
  * Validates a CPF (Brazilian Individual Taxpayer Registry Number).
  * @param cpf - The input CPF as a string.
  * @returns True if the CPF is valid, false otherwise.
  */
  export function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[\s.-]*/g, '');
    if (!cpf || cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false;
    }
    const calculateDigit = (slice: string): number => {
      let sum = 0;
      for (let i = 0; i < slice.length; i++) {
        sum += parseInt(slice[i]) * (slice.length + 1 - i);
      }

      let remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }

      return remainder;
    };

    const firstDigit = calculateDigit(cpf.slice(0, 9));
    const secondDigit = calculateDigit(cpf.slice(0, 10));

    return (
      firstDigit === parseInt(cpf[9]) &&
      secondDigit === parseInt(cpf[10])
    );
  }

  /**
  * Validates a CNPJ (Brazilian Business Taxpayer Registry Number).
  * @param cnpj - The input CNPJ as a string.
  * @returns True if the CNPJ is valid, false otherwise.
  */
  export function isValidCNPJ(cnpj: string): boolean {
    const weights: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digits: string = onlyDigits(cnpj);
    let n = 0;

    for (let i = 0; i < 12; i++) {
      const digit = parseInt(digits[i], 10);
      const weight = weights[i + 1];
      n += digit * weight;
    }
    const firstDigit = (((n %= 11) < 2) ? 0 : 11 - n);
    if (parseInt(digits[12], 10) !== firstDigit) {
      return false;
    }

    n = 0;
    for (let i = 0; i <= 12; i++) {
      const digit = parseInt(digits[i], 10);
      const weight = weights[i];
      n += digit * weight;
    }
    const secondDigit = (((n %= 11) < 2) ? 0 : 11 - n);
    if (parseInt(digits[13], 10) !== secondDigit) {
      return false;
    }

    return true;
  }

  /**
  * Capitalizes the first letter of a string.
  * @param str - The input string.
  * @returns The string with the first letter capitalized.
  */
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
  * Capitalizes the first letter of each word in a string.
  * @param str - The input string.
  * @param splitStr - The delimiter used to split the string into words.
  * @returns The string with the first letter of each word capitalized.
  */
  export function capitalizeAll(str: string, splitStr: string): string {
    return str.split(splitStr).map((strPart: string): string => capitalize(strPart)).join(splitStr)
  }

  export function rightPad(str: string, padChar: string, length: number): string {
    return str + padChar.repeat(length - str.length)
  }

  export function leftPad(str: string, padChar: string, length: number): string {
    return padChar.repeat(length - str.length) + str
  }

  export function removeNearestPatternFromIndex(value: string, pattern: string, index: number): string {
    if (!value || !pattern) {
        throw new Error("The strings must not be empty");
    }
    let closestIndex = -1;
    let minDistance = Infinity;
    for (let i = 0; i <= value.length - pattern.length; i++) {
        const substring = value.slice(i, i + pattern.length);
        if (substring === pattern) {
            const distance = Math.abs(i - index);
            if (distance < minDistance) {
                closestIndex = i;
                minDistance = distance;
            }
        }
    } 
    if (closestIndex === -1) {
        return value;
    }
    return value.slice(0, closestIndex) + value.slice(closestIndex+pattern.length);
  }

  export function getAddedCharacters(original: string, updated: string): string {
    const originalChars = [...original];
    let addedCharacters: string = '';
  
    [...updated].forEach((char: string): void =>{
      const index = originalChars.indexOf(char);
      if (index !== -1) {
        originalChars.splice(index, 1);
      } else {
        addedCharacters += char;
      }

    })  
    return addedCharacters;
  }

  export function getRemovedCharacters(original: string, updated: string): string {
    const updatedChars = [...updated];
    let removedCharacters: string = '';
  
    [...original].forEach((char: string): void => {
      const index = updatedChars.indexOf(char);
      if (index !== -1) {
        updatedChars.splice(index, 1);
      } else {
        removedCharacters += char;
      }
    });
  
    return removedCharacters;
  }

  export function countMissingCharsBeforeIndex(
    oldStr: string,
    newStr: string,
    index: number
  ): number {
    if (index < 0 || index > newStr.length) {
      return Math.abs(oldStr.length - newStr.length);
    }
    const oldSubstr = oldStr.slice(0, index);
    const newSubstr = newStr.slice(0, index);
    let missingCount = 0;
    const charMap = new Map<string, number>();
    for (const char of oldSubstr) {
      charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    for (const char of newSubstr) {
      if (charMap.has(char) && charMap.get(char)! > 0) {
        charMap.set(char, charMap.get(char)! - 1);
      } else {
        missingCount++;
      }
    }
  
    return missingCount;
  }

  export function getFirstDifferentIndex(str1: string, str2: string, defaultValue: number = -1): number {
    let index: number = [...str1].findIndex((char, index) => {
      return str2[index] !== char;
    });
    return index === -1 ? defaultValue : index;
  }

  export function removeCharacters(baseString: string, charsToRemove: string): string {
    return baseString
      .split('')
      .filter(char => !charsToRemove.includes(char))
      .join('');
  }

  export function noAccent(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  
}

const {
  formatPhone,
  isValidCNPJ,
  isValidCPF,
  isValidEmail,
  onlyDigits,
  capitalize,
  capitalizeAll,
  rightPad,
  leftPad,
  getAddedCharacters,
  getRemovedCharacters,
  removeNearestPatternFromIndex,
  countMissingCharsBeforeIndex,
  getFirstDifferentIndex,
  removeCharacters,
  noAccent,
} = StringUtils

export {
  StringUtils,
  formatPhone,
  isValidCNPJ,
  isValidCPF,
  isValidEmail,
  onlyDigits,
  capitalize,
  capitalizeAll,
  rightPad,
  leftPad,
  getAddedCharacters,
  getRemovedCharacters,
  removeNearestPatternFromIndex,
  countMissingCharsBeforeIndex,
  getFirstDifferentIndex,
  removeCharacters,
  noAccent
}