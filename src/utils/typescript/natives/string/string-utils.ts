import { _String } from "./internal";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";

class StringUtils {

    /**
   * Removes all non-digit characters from a string.
   * @param value - The input string.
   * @returns The string with only digits.
   */
  static onlyDigits(value: string): string {
    return _String.onlyDigits(value);
  }

  /**
  * Formats a phone number according to the Brazilian standard.
  * @param phone - The input phone number as a string.
  * @returns The formatted phone number.
  */
  static formatPhone(phone: string) {
    return _String.formatPhone(phone);
  }

  /**
  * Validates an email address using a simple regex pattern.
  * @param email - The input email address as a string.
  * @returns True if the email is valid, false otherwise.
  */
  static isValidEmail(email: string): boolean {
    return _String.isValidEmail(email);
  }

  /**
  * Validates a CPF (Brazilian Individual Taxpayer Registry Number).
  * @param cpf - The input CPF as a string.
  * @returns True if the CPF is valid, false otherwise.
  */
  static isValidCPF(cpf: string): boolean {
    return _String.isValidCPF(cpf);
  }

  /**
  * Validates a CNPJ (Brazilian Business Taxpayer Registry Number).
  * @param cnpj - The input CNPJ as a string.
  * @returns True if the CNPJ is valid, false otherwise.
  */
  static isValidCNPJ(cnpj: string): boolean {
    return _String.isValidCNPJ(cnpj);
  }

  /**
  * Capitalizes the first letter of a string.
  * @param str - The input string.
  * @returns The string with the first letter capitalized.
  */
  static capitalize(str: string): string {
    return _String.capitalize(str);
  }

  /**
  * Capitalizes the first letter of each word in a string.
  * @param str - The input string.
  * @param splitStr - The delimiter used to split the string into words.
  * @returns The string with the first letter of each word capitalized.
  */
  static capitalizeAll(str: string, splitStr: string): string {
    return _String.capitalizeAll(str, splitStr);
  }

  static rightPad(str: string, padChar: string, length: number): string {
    return _String.rightPad(str, padChar, length);
  }

  static leftPad(str: string, padChar: string, length: number): string {
    return _String.leftPad(str, padChar, length);
  }

  static removeNearestPatternFromIndex(value: string, pattern: string, index: number): string {
    return _String.removeNearestPatternFromIndex(value, pattern, index);
  }

  static getAddedCharacters(original: string, updated: string): string {
    return _String.getAddedCharacters(original, updated);
  }

  static getRemovedCharacters(original: string, updated: string): string {
    return _String.getRemovedCharacters(original, updated);
  }

  static countMissingCharsBeforeIndex(
    oldStr: string,
    newStr: string,
    index: number
  ): number {
    return _String.countMissingCharsBeforeIndex(oldStr, newStr, index);
  }

  static getFirstDifferentIndex(str1: string, str2: string, defaultValue: number = -1): number {
    return _String.getFirstDifferentIndex(str1, str2, defaultValue);
  }

  static getLastDifferentIndex(str1: string, str2: string, defaultValue: number = -1): number {
    return _String.getLastDifferentIndex(str1, str2, defaultValue);
  }

  static removeCharacters(baseString: string, charsToRemove: string): string {
    return _String.removeCharacters(baseString, charsToRemove);
  }

  static noAccent(str: string): string {
    return _String.noAccent(str);
  }

  static splitBalancedGroups(text: string, group: string) {
    return _String.splitBalancedGroups(text, group);
  }

  static stringToCharCodeArray(str: string): string[] {
    return _String.stringToCharCodeArray(str);
  }
}

export {
  StringUtils,
}

const {
  isValidCNPJ,
  isValidCPF,
  capitalize,
  capitalizeAll,
  rightPad,
  leftPad,
  getAddedCharacters,
  getRemovedCharacters,
  removeNearestPatternFromIndex,
  countMissingCharsBeforeIndex,
  getFirstDifferentIndex,
  getLastDifferentIndex,
  removeCharacters,
  noAccent,
} = StringUtils;

export {
  isValidCNPJ as strIsValidCNPJ,
  isValidCPF as strIsValidCPF,
  capitalize as strCapitalize,
  capitalizeAll as strCapitalizeAll,
  rightPad as strRightPad,
  leftPad as strLeftPad,
  getAddedCharacters as strGetAddedCharacters,
  getRemovedCharacters as strGetRemovedCharacters,
  removeNearestPatternFromIndex as strRemoveNearestPatternFromIndex,
  countMissingCharsBeforeIndex as strCountMissingCharsBeforeIndex,
  getFirstDifferentIndex as strGetFirstDifferentIndex,
  getLastDifferentIndex as strGetLastDifferentIndex,
  removeCharacters as strRemoveCharacters,
  noAccent as strNoAccent,
}

RegistryUtils.getOrAddRegistryClass(StringUtils);