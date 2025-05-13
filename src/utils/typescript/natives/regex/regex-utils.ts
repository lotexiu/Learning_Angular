import { isNull } from "@ts-natives/object/object-utils";
import { _Regex } from "./internal";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";

class RegexUtils {

  static range(start?: number, end?: number): string {
    if (isNull(start) && isNull(end)) return '*';
    if (start === end && !isNull(start)) {
      if (isNull(start, 0, 1)) return '';
      return `{${start}}`;
    }
    if (start === 1 && isNull(end, 0)) return '+';
    if (isNull(start,0) && end === 1) return '?';
    if (!isNull(start, 0, 1) && isNull(end, 0, 1)) return `{${start},}`;
    if (isNull(start, 0) && !isNull(end, 0, 1)) return `{0,${end}}`;
    return `{${start ?? 0},${end ?? 1}}`;
  }

  static escapeRegexChars(value: string): string {
    return _Regex.escapeRegexChars(value);
  }

  /**
  * Formats a phone number according to the Brazilian standard.
  * @param phone - The input phone number as a string.
  * @returns The formatted phone number.
  */
  static formatPhone(phone: string) {
    return _Regex.formatPhone(phone);
  }

  /**
  * Validates an email address using a simple regex pattern.
  * @param email - The input email address as a string.
  * @returns True if the email is valid, false otherwise.
  */
  static isValidEmail(email: string): boolean {
    return _Regex.isValidEmail(email);
  }

  static isValidCEP(cep: string): boolean {
    return _Regex.isValidCEP(cep);
  }

  /**
  * Removes all non-digit characters from a string.
  * @param value - The input string.
  * @returns The string with only digits.
  */  
  static onlyDigits(value: string): string {
    return _Regex.onlyDigits(value);
  }

  static removeCharsExcept(text: string, allowedChars: string): string {
    return _Regex.removeCharsExcept(text, allowedChars);
  }

  static inverseSeparator(separator: string): string {
    return _Regex.inverseSeparator(separator);
  }

  /**
  * Removes a specified number of levels from a given path.
  * @param path - The input path as a string.
  * @param levels - The number of levels to remove. Default is 1.
  * @returns The path with the specified number of levels removed.
  */
  static downPath(path: string, levels: number = 1): string {
    return _Regex.downPath(path, levels);
  }

  /**
   * Finds all indexes in the input string that most closely match the given pattern using regex.
   * Returns the start indexes of all matches found.
   * @param input - The string to search in.
   * @param pattern - The regex pattern to search for (as string or RegExp).
   * @param flags - Optional regex flags (e.g., 'gi').
   * @returns Array of start indexes for each match found.
   * @example
   * // returns [0, 5]
   * RegexUtils.findPatternIndexes('abcdeabc', 'abc')
   * @example
   * // returns [2]
   * RegexUtils.findPatternIndexes('xxAbcxx', /abc/i)
   * @example
   * // returns [1, 4]
   * RegexUtils.findPatternIndexes('a1a2a', /a\d/)
   */
  static findPatternIndexes(input: string, pattern: string | RegExp, flags?: string): number[] {
    return _Regex.findPatternIndexes(input, pattern, flags);
  }
}

export {

  RegexUtils,
}


const {
  isValidEmail,
  formatPhone,
  onlyDigits,
  removeCharsExcept,
  downPath,
  findPatternIndexes,
} = RegexUtils

export {
  isValidEmail as regIsValidEmail,
  formatPhone as regFormatPhone,
  onlyDigits as regOnlyDigits,
  removeCharsExcept as regRemoveCharsExcept,
  downPath as regDownPath,
  findPatternIndexes as regFindPatternIndexes,
}

RegistryUtils.getOrAddRegistryClass(RegexUtils);