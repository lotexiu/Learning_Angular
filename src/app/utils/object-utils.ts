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
}

const {
  equals,
  isNull,
  isNullOrUndefined,
} = ObjectUtils

export {
  ObjectUtils,
  isNull,
  isNullOrUndefined,
  equals,
}

