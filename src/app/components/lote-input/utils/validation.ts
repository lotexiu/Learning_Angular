import { Compare, LockedParams } from "../../../interfaces/interfaces";
import { Time } from "../../../utils/date-utils";
import { betweenMinMax } from "../../../utils/math-utils";
import { isNull } from "../../../utils/object-utils";
import { isValidCNPJ, isValidCPF, isValidEmail } from "../../../utils/string-utils";
import { InputData, InputDataDigits, InputDataNumbers, InputTypes } from "../interfaces/input-types.interface";
import { InputUtils } from "./input-utils";

function minMaxValidation(value: number, inputData: InputDataDigits<number>, fieldName: string = 'Campo') {
  const { min, max } = inputData
  const compare: Compare = betweenMinMax(value, Number(min), Number(max))
  if (compare != 0) {
    inputData.invalidMessage = getInvalidMessageByCompare(compare, min!, max!, fieldName)
    return false
  }
  return true
}

function getInvalidMessageByCompare(compare: Compare,
  min: number | string,
  max: number | string,
  fieldName: string = 'Campo'): string {
  const value: any = compare == -1 ? min : max
  const direction: string = compare == -1 ? 'maior' : 'menor'
  return (
    compare == 0 ? '' : `${fieldName.capitalize()} precisa ser ${direction} que ${value}!`
  )
}

function text(ngModel: string, inputData: InputDataDigits<number>): boolean {
  const result: boolean = minMaxValidation(ngModel.length, inputData, 'Texto')
  inputData.invalidMessage += ' caracteres!'
  return result
}
function email(ngModel: string, inputData: InputData): boolean {
  let result: boolean = isValidEmail(ngModel)
  if (!result) inputData.invalidMessage = 'Email inválido!'
  return result
}
function phone(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function cpf(ngModel: string, inputData: InputData): boolean {
  let result: boolean = isValidCPF(ngModel)
  if (!result) inputData.invalidMessage = 'CPF inválido!'
  return result
}
function cnpj(ngModel: string, inputData: InputData): boolean {
  let result: boolean = isValidCNPJ(ngModel)
  if (!result) inputData.invalidMessage = 'CNPJ inválido!'
  return result
}
function ip(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function pass(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function time(ngModel: string, inputData: InputDataDigits<string>): boolean {
  if (ngModel.split(':').length < 2) {
    inputData.invalidMessage = 'Horá invalida!'
    return false
  } else {
    const minTime = new Time(inputData.min || "")
    const maxTime = new Time(inputData.max || "")
    const ngModelTime: number = new Time(ngModel || "").castTimeTo('seconds')
    const c: Compare = betweenMinMax(ngModelTime, minTime.castTimeTo('seconds'), maxTime.castTimeTo('seconds'))
    if (c != 0) {
      inputData.invalidMessage = getInvalidMessageByCompare(c, minTime.toString(), maxTime.toString(), 'Hora')
      return false
    }
  }
  return true
}
function date(ngModel: string, inputData: InputDataDigits<string>): boolean {
  let result: boolean = true
  return result
}
function datetime(ngModel: Date, inputData: InputDataDigits<Date>): boolean {
  let result: boolean = true
  return result
}
function number(ngModel: number, inputData: InputDataNumbers): boolean {
  return minMaxValidation(ngModel, inputData, 'Valor')
}
function percent(ngModel: any, inputData: InputDataNumbers): boolean {
  return minMaxValidation(ngModel, inputData, 'Valor')
}
function money(ngModel: any, inputData: InputDataNumbers): boolean {
  return minMaxValidation(ngModel, inputData, 'Valor')
}
function color(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function slider(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function checkbox(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function file(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}
function image(ngModel: any, inputData: InputData): boolean {
  let result: boolean = true
  return result
}

function input_validation(ngModel: any, inputData: InputData): boolean {
  let result: boolean = !(inputData.required && isNull(ngModel, ''))
  inputData.invalidMessage =
    result ? undefined : `${InputUtils.getTextRequired(inputData.type)} obrigatório!`

  let obj: LockedParams<InputTypes, (ngModel: any, inputData: any) => boolean> = {
    text: text,
    email: email,
    phone: phone,
    cpf: cpf,
    cnpj: cnpj,
    ip: ip,
    pass: pass,
    time: time,
    date: date,
    datetime: datetime,
    number: number,
    percent: percent,
    money: money,
    color: color,
    slider: slider,
    checkbox: checkbox,
    file: file,
    image: image,
  }
  if (result && ngModel) {
    result = obj[inputData.type]!(ngModel, inputData)
  }
  return result
}

export {
  input_validation
}