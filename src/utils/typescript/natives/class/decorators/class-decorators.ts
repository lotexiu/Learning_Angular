import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { ClassDecorator } from "./interfaces/decorators-interfaces";
import { ClassUtils } from "../class-utils";

function ClassReflect<T>(description?: string): ClassDecorator<T> {
  return ((target: GenericClass<T>): void => {
    if (target && target.name) {
      ClassUtils.registerClass(target, description);
    }
  }) as any
}

export {
  ClassReflect
}