import { LockedParams } from "src/utils/interfaces/object-interfaces";
import { MaskPatterns, maskPatterns } from "./masks-patterns";
import { regIsValidEmail, strIsValidCNPJ, strIsValidCPF } from "src/utils/easy-use";
import { MaskValidationUtils } from "../mask-validation";
import { Nullable } from "src/utils/interfaces/misc-interfaces";


type MaskValidationFunction = (value: string) => Nullable<string>;

const maskValidations: LockedParams<MaskPatterns, MaskValidationFunction> = {
  TEXT: (value: string): Nullable<string> => {
    return null
  },
  PHONE: (value: string): Nullable<string> => {
    return (
      MaskValidationUtils.validValue(value, maskPatterns.PHONE!) ?
      null : 'Telefone inválido'
    )
  },
  CEP: (value: string): Nullable<string> => {
    return (
      strIsValidCPF(value) ?
      null : 'CEP Inválido'    );
  },
  CNPJ: (value: string): Nullable<string> => {
    return (
      strIsValidCNPJ(value) ?
      null : 'CNPJ Inválido'
    );
  },
  CPF: (value: string): Nullable<string> => {
    return (
      strIsValidCPF(value) ?
      null : 'CPF Inválido'    );
  },
  EMAIL: (value: string): Nullable<string> => {
    return (
      regIsValidEmail(value) ?
      null : 'EMAIL Inválido'
    );
  },
  DATE: (value: string): Nullable<string> => {
    if (MaskValidationUtils.validValue(value, maskPatterns.DATE!, [0])) {
      const [day, month, year] = value.split('/').map(Number)
      if (new Date(`${year}-${month}-${day}`).toString() !== 'Invalid Date') {
        return null
      }
      return 'Data inválida'
    }
    return 'Formato de data inválido'
  },
  TIME: (value: string): Nullable<string> => {
    if (MaskValidationUtils.validValue(value, maskPatterns.TIME!, [0])) {
      const [hour, minute] = value.split(':').map(Number)
      if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
        return null
      }
      return 'Horário inválido'
    }
    return 'Formato de horário inválido'
  },
  DATETIME: (value: string): Nullable<string> => {
    if (MaskValidationUtils.validValue(value, maskPatterns.DATETIME!, [0])) {
      const [date, time] = value.split(' ')
      const [day, month, year] = date.split('/').map(Number)
      const [hour, minute] = time.split(':').map(Number)
      if (
        new Date(`${year}-${month}-${day} ${hour}:${minute}`).toString() !== 'Invalid Date'
      ) {
        return null
      }
      return 'Data e hora inválida'
    }
    return 'Formato de data e hora inválido'
  },
  NUMBER: (value: string): Nullable<string> => {},
  NUMBER_DECIMAL: (value: string): Nullable<string> => {},
  NUMBER_DECIMAL_DOT: (value: string): Nullable<string> => {},
  PERCENTAGE: (value: string): Nullable<string> => {},
  PERCENTAGE_DECIMAL: (value: string): Nullable<string> => {},
  PERCENTAGE_DECIMAL_DOT: (value: string): Nullable<string> => {},
}

export {
  MaskValidationFunction,
  maskValidations
}