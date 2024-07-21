import { CustomReturn } from "../../../interfaces/interfaces"
import { ObjectUtils } from "../../../utils/object-utils"
import { StringUtils } from "../../../utils/string-utils"
import { InputData, InputDataDigits, InputDataNumbers, InputDataSlider, InputDataText, InputTypes } from "../interfaces/input-types.interface"
import { LoteInputComponent } from "../lote-input.component"

type InputDataReturn<Type extends InputTypes> = CustomReturn<Type,[
  [["text","cnpj","cpf","email","pass","phone","ip"],InputDataText],
  [["money","number","percent"],InputDataNumbers],
  [["time","date","datetime"],InputDataDigits],
  [["slider"],InputDataSlider],
]>
namespace InputUtils{

  export function getInputData<T extends InputTypes>(type:T, input?:LoteInputComponent): InputDataReturn<T> {
    let list: InputTypes[] = []
    let InputData: InputData & any = {
      debounce: input?.debounce,
      dropMaskChars: false,
      required: false,
      isValid: (ngModel: any):any=> !(ObjectUtils.isNull(ngModel) && InputData.required)
    }
    if(getNotInputTypes().includes(type)){
      InputData.type = type
    }else{
      InputData.type = 'text'
      InputData.mask = getMask(type)
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

    if(type == "email"){
      InputData.isValid = (ngModel: any): boolean => {
        let result: boolean = !(InputData.required && ObjectUtils.isNull(ngModel))
        if (result && ngModel){
          result = StringUtils.isValidEmail(ngModel)
        }
        return result
      }
    }
    return InputData
  }

  // shownMaskExpression == placeholder
  // dropSpecialCharacters mantem os caracteres da mascara
  // hiddenInput

  export function getMask(type: InputTypes): string{
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
        return 'separator.';
      case "percent":
        return 'separator.';
      case "money":
        return 'separator.';
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
