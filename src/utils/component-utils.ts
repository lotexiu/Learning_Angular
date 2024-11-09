import { InjectionToken } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";


type Constructor<T = {}> = new (...args: any[]) => T;

type Class<T> = {
  [property: string]: any;
} & T

type Provider<T> = {
  provide: InjectionToken<any>,
  useExisting: T,
  multi: boolean,
}

namespace ComponentUtils {
  export function ngValueAcessor<T>(value: Constructor<T>): Provider<T> {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: value as T,
      multi: true
    }
  }

  export function λ<T>(_this: Class<T>, functionName: string): any {
    return (...args: any[]): any => _this[functionName](...args);
  }

  export function lambda<T>(_this: Class<T>, functionName: string): any {
    return λ(_this, functionName)
  }
}

const {
  ngValueAcessor,
  lambda,
  λ,
} = ComponentUtils

export {
  Class,
  Provider,
  ComponentUtils,
  ngValueAcessor,
  lambda,
  λ,
};
