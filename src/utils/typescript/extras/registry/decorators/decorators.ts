import { ClassDecorator, DecoratorPropertyKey, MethodDecorator, PropertyDecorator } from "./interfaces/decorators-interfaces";
import { As } from "@ts-extras/generic-utils";
import { Partial } from "@ts-natives/object/interfaces/native-object-interfaces";
import { RegistryUtils } from "../registry-utils";
import { RegistryFunction, RegistryProperty } from "../model/registry-classes";
import { AnyClass } from "@ts-interfaces/misc-interfaces";

function ClassReflect<T>(description?: string): ClassDecorator<T> {
  return As((target: AnyClass<T>): void => {
    if (target && target.name) {
      RegistryUtils.registryClass(target, description);
    }
  })
}

function MethodReflect<T>(static_: boolean, details: Partial<RegistryFunction<any>>): MethodDecorator<T> {
  return As((target: AnyClass<T>, propertyKey: DecoratorPropertyKey, descriptor: TypedPropertyDescriptor<T>): void => {
    RegistryUtils.registerMethod(target, static_, details, propertyKey, descriptor);
  })
}

// function ParameterReflect<T>(static_: boolean, details?: Partial<DecoratorClassArgFunction>): ParameterDecorator {
//   return As((target: AnyClass<T>, propertyKey: DecoratorPropertyKey | undefined, parameterIndex: number): void => {
//     RegistryUtils.registerParameter(target, static_, details||{}, propertyKey, parameterIndex);
//   })
// }

function PropertyReflect<T>(static_: boolean, details: Partial<RegistryProperty<T>>): PropertyDecorator {
  return As((target: AnyClass<T>, propertyKey: DecoratorPropertyKey): void => {
    RegistryUtils.registerProperty(target, static_, details, propertyKey);
  })
}


export {
  ClassReflect,
  MethodReflect,
  // ParameterReflect,
  PropertyReflect,
  ClassDecorator,
}