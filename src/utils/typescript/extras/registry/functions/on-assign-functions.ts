import { AnyClass } from "@ts-interfaces/misc-interfaces";

function arrayAssign<T>(array: any[], _class: AnyClass<T>): T[] {
  return array.map((value: any): any => {
    const newValue: Object = new _class() as any;
    return newValue.assign(value);
  });
}

export {
  arrayAssign
}