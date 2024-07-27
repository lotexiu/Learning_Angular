namespace ObjectUtils {

  export function isNull(value: any, emptyStringAndZeroIsNull: boolean = true): boolean {
    if ((value === '' || value === 0)  && !emptyStringAndZeroIsNull) {
      return false
    }
    return value !== false && !value
  }

  export function isNullOrUndefined(value: any): boolean {
    return value == null || value == undefined
  }

  export function equals(a: any, b: any, emptyStringAndZeroIsNull: boolean = true): boolean {
    let result: boolean = isNull(a, emptyStringAndZeroIsNull) && isNull(b, emptyStringAndZeroIsNull)
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

