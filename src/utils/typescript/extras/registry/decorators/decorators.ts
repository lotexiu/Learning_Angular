import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { ClassDecorator, DecoratorClassArgFunction, DecoratorClassKeyFunction, DecoratorPropertyKey, MethodDecorator, ParameterDecorator, PropertyDecorator } from "./interfaces/decorators-interfaces";
import { ClassUtils } from "../../../natives/class/class-utils";
import { As } from "@ts-extras/generic-utils";
import { Partial } from "@ts-natives/object/interfaces/native-object-interfaces";

function ClassReflect<T>(description?: string): ClassDecorator<T> {
  return As((target: GenericClass<T>): void => {
    if (target && target.name) {
      ClassUtils.registerClass(target, description);
    }
  })
}

function MethodReflect<T>(static_: boolean, details?: Partial<DecoratorClassKeyFunction>): MethodDecorator<T> {
  return As((target: GenericClass<T>, propertyKey: DecoratorPropertyKey, descriptor: TypedPropertyDescriptor<T>): void => {
    ClassUtils.registerMethod(target, static_, details||{}, propertyKey, descriptor);
  })
}

function ParameterReflect<T>(static_: boolean, details?: Partial<DecoratorClassArgFunction>): ParameterDecorator {
  return As((target: GenericClass<T>, propertyKey: DecoratorPropertyKey | undefined, parameterIndex: number): void => {
    ClassUtils.registerParameter(target, static_, details||{}, propertyKey, parameterIndex);
  })
}

function PropertyReflect<T>(static_: boolean, details: Partial<DecoratorClassArgFunction>): PropertyDecorator {
  return As((target: GenericClass<T>, propertyKey: DecoratorPropertyKey): void => {
    ClassUtils.registerProperty(target, static_, details, propertyKey);
  })
}


export {
  ClassReflect,
  MethodReflect,
  ParameterReflect,
  PropertyReflect,
  ClassDecorator,
}