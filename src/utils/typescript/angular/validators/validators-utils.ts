import { RegexUtils } from "../../natives/regex/regex-utils";
import { StringUtils } from "../../natives/string/string-utils";

class ValidatorsUtils {
  static required(value: string): boolean {
    return String(value).trim().length > 0;
  }

  static minLength(value: string, minLength: number): boolean {
    return String(value).trim().length >= minLength;
  }

  static maxLength(value: string, maxLength: number): boolean {
    return String(value).trim().length <= maxLength;
  }

  static isValidEmail(value: string): boolean {
    return RegexUtils.isValidEmail(value);
  }

  static isValidCPF(value: string): boolean {
    return StringUtils.isValidCPF(value);
  }

  static isValidCNPJ(value: string): boolean {
    return StringUtils.isValidCNPJ(value);
  }
}

export {
  ValidatorsUtils,
}