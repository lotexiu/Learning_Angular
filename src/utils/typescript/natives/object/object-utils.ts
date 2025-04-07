import { Function } from "@ts-interfaces/function-interfaces";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { strCapitalize } from "@ts-natives/string/string-utils";
import { KeyOf, ConcatStrIntoKeys, CustomReturn, EntriesReturn, KeysOfType, RemoveCicularReferences } from "./interfaces/object-interfaces";
class ObjectUtils {
  static removeCircularReferences(): RemoveCicularReferences {
    const seen = new Set();
    return function(key: string, value: any): any {
      if (value !== null && typeof value === 'object') {
        if (seen.has(value)) {
          return undefined;
        }
        seen.add(value);
      }
      return value;
    };
  }

  static isNull<T>(value: Nullable<T>, ...customNullValues: any[]): value is Nullable<null> {
    const jsonNullValues: string[] = customNullValues.map((v: any): string=> json(v))
    return (
      jsonNullValues.includes(json(value)) ?
        true as any :
        ![0,'',false].includes(value as any) && !value as any
    )
  }

  static isNullOrUndefined<T>(value: Nullable<T>): value is Nullable<null> {
    return value == null || value == undefined
  }

  static equals(a: any, b: any, ...customNullValues: any[]): boolean {
    let result: boolean = isNull(a, ...customNullValues) && isNull(b, ...customNullValues)
    if (!result) {
      result = json(a) == json(b)
    }
    return result
  }

  static makeObjectBasedOn<T extends Object>(
    value: T
  ): T {
    const obj = {} as T
    (Object.getOwnPropertyNames(value) as KeyOf<T>[])
      .forEach((key: KeyOf<T>): void => {
        obj[key] = value[key]
    })
    return obj
  }

  static addPrefixToKeys<T extends Object, Prefix extends string>(value: T, prefix: Prefix): ConcatStrIntoKeys<T, Prefix> {
    const obj = (value as any) as T & ConcatStrIntoKeys<T, Prefix>
    (Object.getOwnPropertyNames(value) as KeyOf<T>[])
      .forEach((key: KeyOf<T>): void => {
        const newKey = `${prefix}${strCapitalize(key as any)}` as keyof ConcatStrIntoKeys<T, Prefix>
        obj[newKey] = value[key] as any;
        value[key] = null as any
    })
    return removeNullFields(obj) as any
  }

  static copy<T extends Object, Prefix extends Nullable<string, true> = null >(
    value:T, 
    prefixOnKeys?: Prefix,
  )
  : CustomReturn<Prefix,[
    [[string], ConcatStrIntoKeys<T, Prefix>],
    [[null,undefined], T],
  ]> {
    let copiedValue: any;
    try {
      copiedValue = structuredClone(value)
    } catch {
      copiedValue = makeObjectBasedOn(value)
    }
    
    if (isNull(prefixOnKeys, '')) {
      return copiedValue as any
    }
    copiedValue = addPrefixToKeys(copiedValue, prefixOnKeys)
    return copiedValue
  }

  static json(obj: any): string {
    return JSON.stringify(obj, removeCircularReferences())
  }

  static getValueFromPath(obj: any, path: string): any {
    if (!path || !obj) return obj
    return path.split('.').reduce((acc: any, key: string): any => {
      return acc[key]
    }, obj)
  }

  static setValueFromPath(obj: any, path: string, value: any): void {
    if (!path || !obj) return
    const keys: string[] = path.split('.')
    keys.reduce((acc: any, key: string, idx: number): any => {
      if (idx == keys.length - 1) {
        acc[key] = value
      }
      return acc[key]
    }, obj)
  }

  static removeNullFields<T extends object>(obj: T): Partial<T> {
    return (Object.entries(obj) as EntriesReturn<T>[])
      .reduce((acc: Partial<T>, [key, value]: EntriesReturn<T>): Partial<T> => {
        if (!isNull(value)) {
          acc[key as keyof T] = value;
        }
        return acc;
    }, {} as Partial<T>);
  }

  static λ<T extends Object, R>(
    value: T, 
    functionName: KeysOfType<T, Function>
  ): R {
    return ((...args: any): any => {
      return (value[functionName] as Function)(...args);
    }) as R;
  }

  static lambda<T extends Object, R>(
    value: T, 
    functionName: KeysOfType<T, Function>
  ): R {
    return λ(value, functionName)
  }
}

export {
  ObjectUtils,
}

const {
  equals,
  isNull,
  isNullOrUndefined,
  removeNullFields,
  removeCircularReferences,
  makeObjectBasedOn,
  addPrefixToKeys,
  copy,
  json,
  getValueFromPath,
  setValueFromPath,
  λ,
  lambda,
} = ObjectUtils;

export {
  equals,
  isNull,
  isNullOrUndefined,
  removeNullFields,
  removeCircularReferences,
  makeObjectBasedOn,
  addPrefixToKeys,
  copy,
  json,
  getValueFromPath,
  setValueFromPath,
  λ,
  lambda,
}