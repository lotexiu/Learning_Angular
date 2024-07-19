import { InputTypes } from "../interfaces/input-types.interface"

interface InputDataTemplate {
  debounce: number,
  type: string,
}

// interface InputData2 extends InputData {
//   type:"money"|"number"|"percent"|"time"|"date"|"datetime"
//   min:number
//   max:number
// }
// interface InputData3 extends InputData {
// }

// interface InputData4 extends InputData {
// }

// interface InputData {
//   mask?: string 
//   min: number|Date
//   max: number|Date
//   invalidNumbers: number[]
//   decimals: number
//   values?: any[]
//   step?: number
// }

// type InputData<T extends InputTypes> = 
//   T extends "number"|"s" ? { type: T; step: number } : 
//   InputDataTemplate;


// type MyMappings = [
//   [["number", "money"], string],
//   [["text"], number]
// ];

// type IsInArray<T, A extends any[]> = T extends A[number] ? true : false;

// type TReturn<T, A extends [any]> =
//   T extends A ? string : number

// type Test = TReturn<"number", [[["number"]]]>


// type Test1 = TReturn<"number", [[["number"],string],[["text"],number]]>;


type TReturn<T, L extends [[...any], any][] > = {
  [K in keyof L]: //L[K] //extends [T, infer R] ? R : never
  L[K][0] extends [T] ? string: number
  // {
  //   [J in keyof L[K]]: L[K][J] extends [T]? "X": "Y"
  // }[number]
}[number];

// Exemplo de uso
type Result = TReturn<"y", [[["y"],string],[["n"],number]]>; // string

namespace InputUtils{
  export function getInputData<T extends InputTypes>(type:T): InputData<T> {
    let list: InputTypes[] = []
    let InputData: any = {
      debounce: 250
    }

    if(getNotInputTypes().includes(type)){
      InputData.type = type
    }else{
      InputData.type = 'text'
      InputData.mask = getMask(type)
    }
    list = ["money","number","percent","time","date","datetime"]
    if(list.includes(type)){
      InputData.min = null
      InputData.max = null
    }
    list = ["money","number","percent"]
    if(list.includes(type)){
      InputData.invalidNumbers = []
      InputData.decimals = 2
    }
    if(type == "slider"){
      InputData.values = []
      InputData.step = 1
    }

    list = []

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

let test = InputUtils.getInputData("text")

test.step

export {
  InputUtils
}
