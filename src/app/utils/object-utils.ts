namespace ObjectUtils {

  export function isNull(value:any){
    return value !== false && !value
  }

  export function isNullOrUndefined(value: any): boolean{
    return value == null || value == undefined
  }

  export function equals(a:any, b:any): boolean{
    let result: boolean = isNull(a) && isNull(b)
    if (!result){
      result = JSON.stringify(a) == JSON.stringify(b)
    }
    return result
  }
}

export {
  ObjectUtils
}

