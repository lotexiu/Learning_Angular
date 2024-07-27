import { InputData, InputDataReturn, InputTypes } from "../interfaces/input-types.interface";
import { LoteInputComponent } from "../lote-input.component";
import { validation } from "./validation";
namespace InputUtils{

  export function getInputData<T extends InputTypes>(type:T, input?:LoteInputComponent): InputDataReturn<T> {
    let InputData: InputData & any; 
    let list: InputTypes[] = []

    let doValidation: Function = (ngModel:any): boolean => {
      return validation(ngModel, InputData)
    }

    InputData = {
      type,
      isValid: doValidation,
      required: input?.required || false,
      debounce: input?.debounce,
      dropMaskChars: false,
    }

    list = ["money","number","percent","time","date","datetime"]
    if(list.includes(type)){
      InputData.min = input?.min
      InputData.max = input?.max
    }

    list = ["money","number","percent"]
    if(list.includes(type)){
      InputData.invalidNumbers = input?.invalidNumbers ||  []
      InputData.decimals = input?.decimals ||  2
    }

    if(type == "slider"){
      InputData.values = input?.values || []
      InputData.step = input?.step || 1
    } 

    if(getNotInputTypes().includes(type)){
      InputData.inputType = type
    }else{
      InputData.inputType = 'text'
      InputData.mask = getMask(type, InputData.decimals)
    }

    return InputData
  }

  // shownMaskExpression == placeholder
  // dropSpecialCharacters mantem os caracteres da mascara
  // hiddenInput

  export function getMask(type: string, decimals: number): string{
    switch(type){
      case "cpf":
        return 'CPF_CNPJ';
      case "cnpj":
        return 'CPF_CNPJ';
      case "time":
        return 'Hh:m0||Hh:m0:s0'
      case "date":
        return 'd0/M0/0000'
      case "ip":
        return "IP"
      case "phone":
        return '0000-0000||(00) 0000-0000||(00) 00000-0000||+00 (00) 0000-0000||+00 (00) 00000-0000'
      case "number":
        return `separator.${decimals}`;
      case "percent":
        return `separator.${decimals}`;
      case "money":
        return `separator.${decimals}`;
      case "email":
        return 'A*@A*.S*.S*'
      case "pass":
        return 'A*'
      case "datetime":
        return 'd0/M0/0000 Hh:m0'
      case "color":
      case "slider":
      case "checkbox":
      case "file":
      case "image":
      case "text":
      default:
        return '';
    }
  }

  export function getTypes(): InputTypes[] {
    return [
      "email",
      "phone",
      "cpf",
      "cnpj",
      "ip",
      "pass",
      "time",
      "date",
      "datetime",
      "number",
      "percent",
      "money",
      "color",
      "slider",
      "checkbox",
      "file",
      "image",
      "text"
    ]
  }

  export function getNotInputTypes(): InputTypes[] {
    return [
      'image',
      'file',
      'checkbox',
      'slider',
      'color',      
    ]
  }
}

export {
  InputUtils
}
