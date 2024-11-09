import { LockedParams } from "../../../../utils/interfaces/interfaces";
import { isNull } from "../../../../utils/object-utils";
import { InputData, InputDataDigits, InputTypes } from "../interfaces/input-types.interface";
import { InputUtils } from "./input-utils";

function date(ngModel: string, inputData: InputDataDigits<string>): boolean {
  return true
}

function input_maskAdjust(ngModel: any, inputData: InputData): any {
  let obj: LockedParams<InputTypes, (ngModel: any, inputData: any) => boolean> = {
    // text: text,
    // email: email,
    // phone: phone,
    // cpf: cpf,
    // cnpj: cnpj,
    // ip: ip,
    // pass: pass,
    // time: time,
    date: date,
    // datetime: datetime,
    // number: number,
    // percent: percent,
    // money: money,
    // color: color,
    // slider: slider,
    // checkbox: checkbox,
    // file: file,
    // image: image,
  }
  if (!isNull(ngModel) && obj[inputData.type]) {
    return obj[inputData.type]!(ngModel, inputData)
  }
}

export {
  input_maskAdjust
}