import { ConcatStrIntoFunctions, CustomReturn } from "../interfaces/interfaces"
import { StringUtils } from "./string-utils"

namespace ObjectUtils {

  export function isNull<T>(value: T, ...customNullValues: any[]): value is T {
    if (customNullValues.map((v: any): string=>JSON.stringify(v)).includes(JSON.stringify(value))) return true as any
    return ![0,'',false].includes(value as any) && !value as any
  }

  export function isNullOrUndefined<T>(value: T): value is T {
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

  export function deepCopy(value: any) {
    const newObj: any = {}
    for (let key in value){
      if (value[key] && 
          typeof value[key] == 'object' &&
          !Object.keys(value[key]).includes('__ngContext__')){
        newObj[key] = deepCopy(value[key])
      }else{
        newObj[key] = value[key]
      }
    }
    return newObj
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
  deepCopy
} = ObjectUtils

export {
  ObjectUtils,
  isNull,
  isNullOrUndefined,
  equals,
  concatStrIntoFunctions,
  json,
  deepCopy
}

