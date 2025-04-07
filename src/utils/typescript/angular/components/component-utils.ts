import { InjectionToken, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, debounceTime } from "rxjs";
import { Constructor, KeysOfType } from "../../natives/object/interfaces/object-interfaces";
import { copy } from "../../natives/object/object-utils";
import { mathRandom } from "../../natives/math/math-utils";

type Provider<T> = {
  provide: InjectionToken<any>,
  useExisting: T,
  multi: boolean,
}
class ComponentUtils {
  static ngValueAcessor<T extends Constructor<T>>(value: T): Provider<T> {
    return {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): T => value) as T,
      multi: true
    }
  }

  static createDebounce<T extends Object, Key extends KeysOfType<T,Function> = KeysOfType<T,Function>>(
    value: T, 
    functionName: Key, 
    debounce: number
  ): Subject<any> {
    const subject = new Subject<any>();
    subject.pipe(debounceTime(debounce)).subscribe((...event: any[]): void => {
      (value[functionName] as Function)(...event);
    });
    return subject;
  }

  static newId(): string {
    const date: string = new Date(Math.pow(mathRandom(7,9.99999),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length/2));
  }
}

export {
  Provider,
  ComponentUtils,
};

const {
  createDebounce,
  ngValueAcessor
} = copy(ComponentUtils)

export {
  createDebounce,
  ngValueAcessor,
}