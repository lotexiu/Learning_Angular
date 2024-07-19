type InputTypes =
"email"|"phone"|"cpf"|"cnpj"|
"ip"|"pass"|
"time"|"date"|"datetime"|
"number"|"percent"|"money"|
"color"|"slider"|"checkbox"|
"file"|"image"|"text"

interface InputData {
  debounce: number,
  type: string,
}
interface InputDataText extends InputData{
  type: "text"
  mask: string
}
interface InputDataDigits extends InputDataText {
  min: number
  max: number  
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