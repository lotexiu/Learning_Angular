export class StringUtils {


  static onlyDigits(value: string): string {
    return value.replace(/\D/g, '')
  }

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

  static isValidCPF(cpf: string): boolean {
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

  static isValidCNPJ(cnpj: string): boolean {
    const weights: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const digits: string = this.onlyDigits(cnpj);
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

  static isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    return emailRegex.test(email);
  }


}