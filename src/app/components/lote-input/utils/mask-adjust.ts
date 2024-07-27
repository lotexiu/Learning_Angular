import { LockedParams } from "../../../interfaces/interfaces";
import { isNull } from "../../../utils/object-utils";
import { InputData, InputTypes } from "../interfaces/input-types.interface";
import { InputUtils } from "./input-utils";

function input_maskAdjust(ngModel: any, inputData: InputData): any {
  let obj: LockedParams<InputTypes, (ngModel: any, inputData: any) => boolean> = {
  //   text: text,
  //   email: email,
  //   phone: phone,
  //   cpf: cpf,
  //   cnpj: cnpj,
  //   ip: ip,
  //   pass: pass,
  //   time: time,
  //   date: date,
  //   datetime: datetime,
  //   number: number,
  //   percent: percent,
  //   money: money,
  //   color: color,
  //   slider: slider,
  //   checkbox: checkbox,
  //   file: file,
  //   image: image,
  // }
  // if (result && ngModel) {
  //   result = obj[inputData.type]!(ngModel, inputData)
  }
  return
}

export {
  input_maskAdjust
}