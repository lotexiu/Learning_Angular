import { InjectionToken, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject, debounceTime } from "rxjs";
import { Constructor, KeysOfType } from "../../natives/object/interfaces/object-interfaces";

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

  static createDebounce<T extends Object, Key extends KeysOfType<T,Function>>(
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
}

export {
  Provider,
  ComponentUtils,
};