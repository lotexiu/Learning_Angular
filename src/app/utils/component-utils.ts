import { InjectionToken } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";


type Constructor<T = {}> = new (...args: any[]) => T;

interface cclass<T> extends Constructor<T>{
  [property: string]: any
}

type provider<T> = {
  provide: InjectionToken<any>,
  useExisting: T,
  multi: boolean,
}

namespace ComponentUtils {
  export function ngValueAcessor<T>(value: cclass<T>): provider<T>{
    return{
      provide: NG_VALUE_ACCESSOR,
      useExisting: value as T,
      multi: true
    }
  }

  export function λ<T>(a:T, func: string): any{
    return (e:any)=> a[func](e);
  }

}

export {
  ComponentUtils,
  cclass,
  provider
};
