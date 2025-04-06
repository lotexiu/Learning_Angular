import { AbstractControl } from "@angular/forms";
import { ValidatorsUtils } from "./validators-utils";



type ValidatorReturn = {[key: string]: string} | null
type NGValidator = (control: AbstractControl) => ValidatorReturn
type ValidatorCallFunc = (control: AbstractControl, ...args: any[]) => ValidatorReturn

class NGValidatorsUtils {

  private static build(callFunc:ValidatorCallFunc, ...args: any[]): NGValidator {
    return (control: AbstractControl): ValidatorReturn => {
      return callFunc(control, ...args)
    }
    
  }

  static required(name: string): NGValidator{
    return NGValidatorsUtils.build((control: AbstractControl): ValidatorReturn =>{
      return (
        ValidatorsUtils.required(control.value) ?
        null : {required: `${name} obrigatório`}
      )
    })
  }

  static minLength(min: number): NGValidator{
    return NGValidatorsUtils.build((control: AbstractControl): ValidatorReturn =>{
      return (
        ValidatorsUtils.minLength(control.value, min) ?
        null : {minLength: `Mínimo de ${min} caracteres`}
      )
    })
  }

  static maxLength(max: number): NGValidator{
    return NGValidatorsUtils.build((control: AbstractControl): ValidatorReturn =>{
      return (
        ValidatorsUtils.maxLength(control.value, max) ?
        null : {maxLength: `Máximo de ${max} caracteres`}
      )
    })
  }

  static email(): NGValidator{
    return NGValidatorsUtils.build((control: AbstractControl): ValidatorReturn =>{
      return (
        ValidatorsUtils.isValidEmail(control.value) ?
        null : {isEmail: 'Email inválido'}
      )
    })
  }

  static CPF(): NGValidator{
    return NGValidatorsUtils.build((control: AbstractControl): ValidatorReturn =>{
      return (
        ValidatorsUtils.isValidCPF(control.value) ?
        null : {isCPF: 'CPF inválido'}
      )
    })
  }

  static CNPJ(): NGValidator{
    return NGValidatorsUtils.build((control: AbstractControl): ValidatorReturn =>{
      return (
        ValidatorsUtils.isValidCNPJ(control.value) ?
        null : {isCNPJ: 'CNPJ inválido'}
      )
    })
  }
}

export {
  NGValidatorsUtils
};
