import { Compare, LockedParams } from "../../../interfaces/interfaces";
import { betweenMinMax } from "../../../utils/math-utils";
import { isNull } from "../../../utils/object-utils";
import { capitalize, isValidCNPJ, isValidCPF, isValidEmail } from "../../../utils/string-utils";
import { InputData, InputDataDigits, InputDataNumbers, InputTypes } from "../interfaces/input-types.interface";
import { InputUtils } from "./input-utils";

function minMaxValidation(value: number, inputData: InputDataDigits<number>, fieldName: string = 'Campo'){
  const {min, max} = inputData
  const result: Compare = betweenMinMax(value, min, max)
  if (result == -1){
    inputData.invalidMessage = `${capitalize(fieldName)} precisa ser maior que ${min}`
    return false
  } else if (result == 1){
    inputData.invalidMessage = `${capitalize(fieldName)} precisa ser menor que ${max}`
    return false
  }
  return true
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
  if(!result) inputData.invalidMessage = 'CPF inválido!'
  return result
}
function cnpj(ngModel: string, inputData: InputData): boolean {
  let result: boolean = isValidCNPJ(ngModel)
  if(!result) inputData.invalidMessage = 'CNPJ inválido!'
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
function time(ngModel: Date, inputData: InputDataDigits<Date>): boolean {
  let result: boolean = true
  return result
}
function date(ngModel: Date, inputData: InputDataDigits<Date>): boolean {
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
    result ? undefined : `${InputUtils.getField(inputData.type)} obrigatório!`

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