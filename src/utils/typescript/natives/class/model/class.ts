import { Nullable } from "@ts-interfaces/misc-interfaces";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";

type OnChanges = (key: PropertyKey, previous: any, value: any) => void;
abstract class Class extends Object{
  get class(): this {
    return this.constructor as any;
  }

  protected set(key: PropertyKey, value: any): void {
    const previous: any = this[key as KeyOf<this>];
    this[key as KeyOf<this>] = value;
    if (this.onChanges) {
      this.onChanges(key, previous, value)
    }
  }

  protected onChanges(key: PropertyKey, previous: any, value: any): void {}
  onChangesEmitter: Nullable<OnChanges>
  
  constructor() {
    super()
  }
}

export {
  Class
};
