import { Constructor } from "@angular/cdk/table";
import { InjectionToken, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { newId } from "@ts-natives/class/class-utils";
import { KeysOfType } from "@ts-natives/object/interfaces/object-interfaces";
import { copy } from "@ts-natives/object/object-utils";
import { Subject, debounceTime } from "rxjs";


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
    return newId()
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