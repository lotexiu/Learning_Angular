import { InputData, InputDataReturn, InputTypes } from "../interfaces/input-types.interface";
import { LoteInputComponent } from "../lote-input.component";
import { input_maskAdjust } from "./mask-adjust";
import { input_ngModelAdjust } from "./ngmodel-adjust";
import { input_validation } from "./validation";
namespace InputUtils{

  export function getInputData<T extends InputTypes>(type:T, input?:LoteInputComponent): InputDataReturn<T> {
    let inputData: InputData & any; 
    let list: InputTypes[] = []

    let _validation: Function = (ngModel:any): boolean => {
      return input_validation(ngModel, inputData)
    }
    let _maskAdjust: Function = (ngModel:any): any => {
      return input_maskAdjust(ngModel, inputData)
    }
    let _ngModelAdjust: Function = (ngModel:any): any => {
      return input_ngModelAdjust(ngModel, inputData)
    }

    inputData = {
      type,
      isValid: _validation,
      maskAdjust: _maskAdjust,
      ngModelAdjust: _ngModelAdjust,
      required: input?.required || false,
      debounce: input?.debounce,
      dropMaskChars: false,
    }

    list = ["money","number","percent","time","date","datetime","text"]
    if(list.includes(type)){
      inputData.min = input?.min
      inputData.max = input?.max
    }

    list = ["money","number","percent"]
    if(list.includes(type)){
      inputData.dropMaskChars = true
      inputData.invalidNumbers = input?.invalidNumbers ||  []
      inputData.decimals = input?.decimals ||  2
      inputData.sufix = type == 'percent' ? input?.suffix || '%':''
      inputData.prefix = type == 'money' ? input?.prefix || 'R$ ':''
    }

    if(type == "slider"){
      inputData.values = input?.values || []
      inputData.step = input?.step || 1
    } 

    if(getTypes('others').includes(type)){
      inputData.inputType = type
    }else{
      inputData.inputType = 'text'
      inputData.mask = getMask(type, inputData.decimals)
    }

    return inputData
  }

  export function getMask(type: string, decimals: number): string{
    switch(type){
      case "cpf":
        return 'CPF_CNPJ';
      case "cnpj":
        return 'CPF_CNPJ';
      case "time":
        return 'Hh:m0||Hh:m0:s0'
      case "date":
        return '00/00/0000'
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

  export function getTypes(type:'digits'|'number'|'text'|'others'|'all'): InputTypes[]{
    switch(type){
      case "all":
        return ["email","phone","cpf","cnpj","ip","pass","time","date","datetime","number","percent","money","color",
          "slider","checkbox","file","image","text"]
      case "text":
        return ["email","phone","cpf","cnpj","ip","pass","time","date","datetime","number","percent","money","text"]
      case "digits":
        return ["money","number","percent","time","date","datetime","text"]
      case "number":
        return ["money","number","percent"]
      case "others":
        return ['image','file','checkbox','slider','color',]
    }
  }
}

export {
  InputUtils
}
