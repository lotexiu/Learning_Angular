const RegexPatterns = {
  Digit: '\\d',
  Letter: '[A-Za-z]',
  LetterOrDigit: '[A-Za-z0-9]',
  UppercaseLetter: '[A-Z]',
  LowercaseLetter: '[a-z]',
  SpecialChar: '[^A-Za-z0-9]',
  Whitespace: '\\s',
  Any: '[\\s\\S]',
  Word: '\\w',
  NotWord: '\\W',
  NotDigit: '\\D',
  NotWhitespace: '\\S',
  Dot: '[.]',
  Comma: '[,]',
  /* LookAround */
  PositiveLookahead: '?=',
  NegativeLookahead: '?!',
  PositiveLookbehind: '?<=',
  NegativeLookbehind: '?<!',
  /* ReservedKeys */
  AnyExceptWhiteSpace: '.',
  Escape: '\\',
  Or: '|',
  /* Others */
  Number: '(\\d+)(?=[,.])(?!(\\d))',
  Decimal: '(?<=[,.])(\\d+)(?!(?:.+)?[,.])',
  DecimalSeparator: '[.,]',
}

const MaskRegexPatterns = {
  Number: /(?<=\d)(?=(\d{3})+(?!\d))/g,
  NumberWithDecimal: /(?<=\d)(?=(\d{3})+(?!\d)(?=[,.]))/g,
}

class RegexUtils {
  /**
  * Formats a phone number according to the Brazilian standard.
  * @param phone - The input phone number as a string.
  * @returns The formatted phone number.
  */
  static formatPhone(phone: string) {
    let phoneOnlyDigits = this.onlyDigits(phone).slice(0, 13)
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
  * Validates an email address using a simple regex pattern.
  * @param email - The input email address as a string.
  * @returns True if the email is valid, false otherwise.
  */
  static isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    return emailRegex.test(email);
  }

  static isValidCEP(cep: string): boolean {
    return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ""));
  }

  /**
  * Removes all non-digit characters from a string.
  * @param value - The input string.
  * @returns The string with only digits.
  */  
  static onlyDigits(value: string): string {
    return value.replace(/\D/g, '')
  }

  static removeCharsExcept(text: string, allowedChars: string): string {
    if (!text || !allowedChars) return '';    
    /* Escapa caracteres especiais do regex */
    const escapedChars: string = allowedChars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');    
    /* Cria padrão regex que corresponde a qualquer caractere que NÃO esteja na lista */
    const pattern = new RegExp(`[^${escapedChars}]`, 'g');    
    /* Substitui todos os caracteres não permitidos por string vazia */
    return text.replace(pattern, '');
  }

  static inverseSeparator(separator: string): string {
    return separator == '.' ? ',' : '.';
  }

  static formatNumber(value: string): string {
    const decimalSeparator: string = value.includes('.') ? '.' : ',';
    const [integerPart, decimalPart] = value.split(RegexPatterns.DecimalSeparator);
    const formattedInteger = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g, 
      this.inverseSeparator(decimalSeparator)
    );    
    return decimalPart ? `${formattedInteger}${decimalSeparator}${decimalPart}` : formattedInteger;
  }

  /**
  * Removes a specified number of levels from a given path.
  * @param path - The input path as a string.
  * @param levels - The number of levels to remove. Default is 1.
  * @returns The path with the specified number of levels removed.
  */
  static downPath(path: string, levels: number = 1): string {
    const parts = path.split('/');
    return parts.slice(0, -levels).join('/');
  }
}

export {
  RegexPatterns,
  MaskRegexPatterns,
  RegexUtils,
}