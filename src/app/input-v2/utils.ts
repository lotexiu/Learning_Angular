import { Component } from "@angular/core";

@Component({
  template:'',
  standalone:true,
})
export class InputUtils{

  uploadIconPath = 
    "M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 " +
    "11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 " +
    "18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 " +
    "22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 " +
    "15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 " +
    "1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 " +
    "9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 " +
    "5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 " +
    "11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 " +
    "14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 " +
    "13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 " +
    "19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 " +
    "14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z"
  
  onlyDigits(value:string):string{
    return value.replace(/\D/g, '')
  }

  formatPhone(phone: string){
    let phoneOnlyDigits = this.onlyDigits(phone).slice(0,13)
    let phoneSize = phoneOnlyDigits.length

    function dynamicPhoneMask(){
      let maskPart = phoneSize > 4 ? "-" : ""
      return (
        `${phoneOnlyDigits.slice(0,4)}${maskPart}${phoneOnlyDigits.slice(4,8)}`
      )
    }

    return(
      phoneSize <   9 ? dynamicPhoneMask() :
      phoneSize ==  9 ? phoneOnlyDigits.replace(/(\d{5})(\d{4})$/, '$1-$2') :
      phoneSize == 10 ? phoneOnlyDigits.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3') :
      phoneSize == 11 ? phoneOnlyDigits.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3') :
      phoneSize == 12 ? phoneOnlyDigits.replace(/(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4') :
      phoneOnlyDigits.replace(/(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')
    )
  }

  isValidCPF(cpf: string): boolean {
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

  isValidCNPJ(cnpj: string): boolean {
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

  isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    return emailRegex.test(email);
  }


}