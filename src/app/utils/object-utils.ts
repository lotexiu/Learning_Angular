import { ConcatStrIntoFunctions } from "../interfaces/interfaces"
import { StringUtils } from "./string-utils"

namespace ObjectUtils {

  export function isNull(value: any, ...customNullValues: any[]): boolean {
    if (customNullValues.map((v: any): string=>JSON.stringify(v)).includes(JSON.stringify(value))) return true
    return ![0,'',false].includes(value) && !value
  }

  export function isNullOrUndefined(value: any): boolean {
    return value == null || value == undefined
  }

  export function equals(a: any, b: any, ...customNullValues: any[]): boolean {
    let result: boolean = isNull(a, ...customNullValues) && isNull(b, ...customNullValues)
    if (!result) {
      result = JSON.stringify(a) == JSON.stringify(b)
    }
    return result
  }

  export function concatStrIntoFunctions<Base, Prefix extends string>(obj: Base, prefix: Prefix): ConcatStrIntoFunctions<Base, Prefix> {
    const result = {} as ConcatStrIntoFunctions<Base, Prefix>;
    for (const key in obj) {
      if (typeof obj[key] === 'function') {
        const newKey = `${prefix}${StringUtils.capitalize(key)}` as keyof ConcatStrIntoFunctions<Base,Prefix>
        result[newKey] = obj[key] as ConcatStrIntoFunctions<Base, Prefix>[typeof newKey]; 
      }
    }
    return result;
  }

  export function json(obj: any): string {
    return JSON.stringify(obj)
  }
}

const {
  equals,
  isNull,
  isNullOrUndefined,
  concatStrIntoFunctions,
  json,
} = ObjectUtils

export {
  ObjectUtils,
  isNull,
  isNullOrUndefined,
  equals,
  concatStrIntoFunctions,
  json,
}

