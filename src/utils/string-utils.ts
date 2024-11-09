namespace StringUtils {

    /**
   * Removes all non-digit characters from a string.
   * @param value - The input string.
   * @returns The string with only digits.
   */
  export function onlyDigits(value: string): string {
    return value.replace(/\D/g, '')
  }

    /**
   * Formats a phone number according to the Brazilian standard.
   * @param phone - The input phone number as a string.
   * @returns The formatted phone number.
   */
  export function formatPhone(phone: string) {
    let phoneOnlyDigits = onlyDigits(phone).slice(0, 13)
    let phoneSize = phoneOnlyDigits.length

    function dynamicPhoneMask() {
      let maskPart = phoneSize > 4 ? "-" : ""
      return (
        `${phoneOnlyDigits.slice(0, 4)}${maskPart}${phoneOnlyDigits.slice(4, 8)}`
      )
    }
    return (
      phoneSize < 9 ? dynamicPhoneMask() :
      phoneSize == 9 ? phoneOnlyDigits.replace(/(\d{5})(\d{4})$/, '$1-$2') :
      phoneSize == 10 ? phoneOnlyDigits.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3') :
      phoneSize == 11 ? phoneOnlyDigits.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3') :
      phoneSize == 12 ? phoneOnlyDigits.replace(/(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4') :
      phoneOnlyDigits.replace(/(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')
    )
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
   * Validates an email address using a simple regex pattern.
   * @param email - The input email address as a string.
   * @returns True if the email is valid, false otherwise.
   */
  export function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    return emailRegex.test(email);
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
}

const {
  formatPhone,
  isValidCNPJ,
  isValidCPF,
  isValidEmail,
  onlyDigits,
  capitalize,
  capitalizeAll,
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
}
