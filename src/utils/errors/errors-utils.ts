import { Nullable } from "../interfaces/interfaces";
import { defaultErrors } from "./constants/errors";
import { Error } from "./interfaces/error.interface";

class ErrorsUtils {

  static identifyError(fieldTitle: string, error: Error): string {
    let defaultError: Nullable<string> = defaultErrors[error.key]

    if (defaultError){
      return `${fieldTitle} ${defaultError}`
    }
    return ''
  }
}

export {
  ErrorsUtils
}