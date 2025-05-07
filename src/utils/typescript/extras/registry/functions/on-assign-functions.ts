import { Partial } from "@ts-natives/object/interfaces/native-object-interfaces";
import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";

function arrayAssign<T>(array: any[], _class: GenericClass<T>): T[] {
  return array.map((value: any): any => {
    const newValue: Object = new _class() as any;
    return newValue.assign(value);
  });
}

export {
  arrayAssign
}