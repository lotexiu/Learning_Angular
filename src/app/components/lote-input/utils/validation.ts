import { isNull } from "../../../utils/object-utils";
import { isValidEmail } from "../../../utils/string-utils";
import { InputData } from "../interfaces/input-types.interface";

function validation(ngModel:any, inputData: InputData): boolean{
  let result: boolean = !(inputData.required && isNull(ngModel))
  inputData.invalidMessage = result ? undefined : 'Campo obrigatório!'
  if (result && ngModel){
    let list;
    list = ["money","number","percent","time","date","datetime"]
    if(list.includes(inputData.type)){
    }
    list = ["money","number","percent"]
    if(list.includes(inputData.type)){
    }
    if(inputData.type == 'email'){
      result = isValidEmail(ngModel)
      if (!result) inputData.invalidMessage = 'Email inválido!'
    }
  }
  return result
}

export {
  validation
}