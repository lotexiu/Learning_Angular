import { CustomReturn } from "../../../interfaces/interfaces"

type InputTypes =
"text"|
"email"|
"phone"|
"cpf"|
"cnpj"|
"ip"|
"pass"|
"time"|
"date"|
"datetime"|
"number"|
"percent"|
"money"|
"color"|
"slider"|
"checkbox"|
"file"|
"image"

type InputDataReturn<Type extends InputTypes> = CustomReturn<Type,[
  [["cnpj","cpf","email","pass","phone","ip"],InputDataText],
  [["money","number","percent"],InputDataNumbers],
  [["time","date","datetime","text"],InputDataDigits],
  [["slider"],InputDataSlider],
]>

type InputDataTypes = InputData|
InputDataText|
InputDataDigits|
InputDataNumbers|
InputDataSlider

interface InputData {
  debounce: number
  inputType: string
  type: InputTypes
  dropMaskChars: boolean
  required: boolean
  isValid: (ngModel:any)=>boolean
  maskAdjust: (ngModel:any)=>any
  ngModelAdjust: (ngModel:any)=>any
  invalidMessage?: string
}
interface InputDataText extends InputData{
  mask: string
}
interface InputDataDigits<T=number|Date> extends InputDataText {
  type: "money"|"number"|"percent"|"time"|"date"|"datetime"|"text"
  min?: T
  max?: T
}
interface InputDataNumbers extends InputDataDigits<number>{
  prefix: string
  suffix: string
  type: "money"|"number"|"percent"
  decimals: number
  invalidNumbers: number[]
}
interface InputDataSlider extends InputData {
  type: "slider"
  values: number
  step: number
}

export {
  InputTypes,
  InputData,
  InputDataText,
  InputDataDigits,
  InputDataNumbers,
  InputDataSlider,
  InputDataReturn,
  InputDataTypes
}