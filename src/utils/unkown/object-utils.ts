import { Nullable } from "../interfaces/misc-interfaces"
import { ConcatStrIntoKeys } from "../interfaces/object-interfaces"
import { StringUtils } from "./string-utils"

namespace ObjectUtils {

  function removeCircularReferences() {
    const seen = new Set();
  
    return function(key: string, value: any) {
      if (value !== null && typeof value === 'object') {
        if (seen.has(value)) {
          return undefined; // Remove a referência circular
        }
        seen.add(value);
      }
      return value;
    };
  }

  export function isNull<T>(value: Nullable<T>, ...customNullValues: any[]): value is Nullable<null> {
    if (customNullValues.map((v: any): string=>JSON.stringify(v)).includes(JSON.stringify(value, removeCircularReferences()))) return true as any
    return ![0,'',false].includes(value as any) && !value as any
  }

  export function isNullOrUndefined<T>(value: Nullable<T>): value is Nullable<null> {
    return value == null || value == undefined
  }

  export function equals(a: any, b: any, ...customNullValues: any[]): boolean {
    let result: boolean = isNull(a, ...customNullValues) && isNull(b, ...customNullValues)
    if (!result) {
      result = JSON.stringify(a) == JSON.stringify(b)
    }
    return result
  }

  export function concatStrIntoFunctions<Base, Prefix extends string>(obj: Base, prefix: Prefix): ConcatStrIntoKeys<Base, Prefix> {
    const result = {} as ConcatStrIntoKeys<Base, Prefix>;
    let objAny: any = obj as any
    Object.getOwnPropertyNames(obj).forEach((key: string) => {
      if (typeof objAny[key] === 'function') {
        const newKey = `${prefix}${StringUtils.capitalize(key)}` as keyof ConcatStrIntoKeys<Base,Prefix>
        result[newKey] = objAny[key] as ConcatStrIntoKeys<Base, Prefix>[typeof newKey]; 
      }
    })
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

  export function getValueFromPath(obj: any, path: string): any {
    if (!path || !obj) return obj
    return path.split('.').reduce((acc: any, key: string): any => {
      return acc[key]
    }, obj)
  }

  export function setValueFromPath(obj: any, path: string, value: any): void {
    if (!path || !obj) return
    const keys = path.split('.')
    keys.reduce((acc: any, key: string, idx: number): any => {
      if (idx == keys.length - 1) {
        acc[key] = value
      }
      return acc[key]
    }, obj)
  }

  export function removeNullFields<T extends object>(obj: T): Partial<T> {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as Partial<T>);
  } 
}

export {
  ObjectUtils,
}
