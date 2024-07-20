type InputTypes =
"email"|"phone"|"cpf"|"cnpj"|
"ip"|"pass"|
"time"|"date"|"datetime"|
"number"|"percent"|"money"|
"color"|"slider"|"checkbox"|
"file"|"image"|"text"

interface InputData {
  debounce: number
  type: string
  dropMaskChars: boolean
  isValid: (ngModel:any)=>boolean
}
interface InputDataText extends InputData{
  type: "text"
  mask: string
}
interface InputDataDigits extends InputDataText {
  min: number|Date
  max: number|Date
}
interface InputDataNumbers extends InputDataDigits{
  decimals: number
  invalidNumbers: number[]
}
interface InputDataSlider extends InputData {
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
}