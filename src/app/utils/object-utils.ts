namespace ObjectUtils {

  export function isNull(value: any, emptyStringIsNull: boolean = true): boolean {
    if (value == '' && !emptyStringIsNull) {
      return false
    }
    return value !== false && !value
  }

  export function isNullOrUndefined(value: any): boolean {
    return value == null || value == undefined
  }

  export function equals(a: any, b: any, emptyStringIsNull: boolean = true): boolean {
    let result: boolean = isNull(a, emptyStringIsNull) && isNull(b, emptyStringIsNull)
    if (!result) {
      result = JSON.stringify(a) == JSON.stringify(b)
    }
    return result
  }
}

export {
  ObjectUtils
}

