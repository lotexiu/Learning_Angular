import { InjectionToken, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";
import { Subject, debounceTime } from "rxjs";
import { KeysOfType } from "../interfaces/object-interfaces";
import { random } from "../easy-use";


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

class ComponentUtils {
  static ngValueAcessor<T>(value: Constructor<T>): Provider<T> {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => value) as T,
      multi: true
    }
  }

  static λ<T>(_this: Class<T>, functionName: KeysOfType<T, any>): any {
    return (...args: any[]): any => _this[functionName](...args);
  }

  static lambda<T>(_this: Class<T>, functionName: KeysOfType<T, any>): any {
    return ComponentUtils.λ(_this, functionName)
  }

  static createDebounce(_this: Class, functionName: string, debounce: number): Subject<any> {
    const subject = new Subject<any>();
    subject.pipe(debounceTime(debounce)).subscribe((...event) => {
      _this[functionName](...event);
    });
    return subject;
  }

  static newId(): string {
    const date: string = new Date(Math.pow(random(7,9.99999),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length/2));
  }
}

export {
  Class,
  Provider,
  ComponentUtils,
};