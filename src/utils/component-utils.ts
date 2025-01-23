import { InjectionToken, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { KeysOfType } from "./interfaces/interfaces";
import { Subject, debounceTime } from "rxjs";
import { random } from "./math/math-utils";


type Constructor<T = {}> = new (...args: any[]) => T;

type Class<T=any> = {
  [property: string]: any;
}

type Provider<T> = {
  provide: InjectionToken<any>,
  useExisting: T,
  multi: boolean,
}

const ngControlFunctionsLink = new Map<NgControl, Map<Class, string>>();

namespace ComponentUtils {
  export function ngValueAcessor<T>(value: Constructor<T>): Provider<T> {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => value) as T,
      multi: true
    }
  }

  export function λ<T>(_this: Class<T>, functionName: KeysOfType<T, Function>): any {
    return (...args: any[]): any => _this[functionName](...args);
  }

  export function lambda<T>(_this: Class<T>, functionName: KeysOfType<T, Function>): any {
    return λ(_this, functionName)
  }

  export function linkFunctionToNGControl<T>(_this: Class<T>, functionName: string, ngControl: NgControl): any {
    if (ngControlFunctionsLink.has(ngControl)) {
      ngControlFunctionsLink.get(ngControl)!.set(_this, functionName);
    } else {
      ngControlFunctionsLink.set(ngControl, new Map());
      ngControlFunctionsLink.get(ngControl)!.set(_this, functionName);
    }
  }

  export function createDebounce(_this: Class, functionName: string, debounce: number): any {
    const subject = new Subject<any>();
    subject.pipe(debounceTime(debounce)).subscribe((...event) => {
      _this[functionName](...event);
    });
    return subject;
  }

  export function newId(): string {
    const date: string = new Date(Math.pow(random(7,9.99999),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length/2));
  }
}

const {
  ngValueAcessor,
  lambda,
  λ,
  createDebounce,
} = ComponentUtils

export {
  Class,
  Provider,
  ComponentUtils,
  ngValueAcessor,
  lambda,
  λ,
  createDebounce,
};