import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { ClassDecorator, DecoratorPropertyKey, MethodDecorator, PropertyDecorator } from "./interfaces/decorators-interfaces";
import { As } from "@ts-extras/generic-utils";
import { Partial } from "@ts-natives/object/interfaces/native-object-interfaces";
import { RegistryUtils } from "../registry-utils";
import { RegistryFunction, RegistryProperty } from "../model/registry-classes";

function ClassReflect<T>(description?: string): ClassDecorator<T> {
  return As((target: GenericClass<T>): void => {
    if (target && target.name) {
      RegistryUtils.registryClass(target, description);
    }
  })
}

function MethodReflect<T>(static_: boolean, details: Partial<RegistryFunction<any>>): MethodDecorator<T> {
  return As((target: GenericClass<T>, propertyKey: DecoratorPropertyKey, descriptor: TypedPropertyDescriptor<T>): void => {
    RegistryUtils.registerMethod(target, static_, details, propertyKey, descriptor);
  })
}

// function ParameterReflect<T>(static_: boolean, details?: Partial<DecoratorClassArgFunction>): ParameterDecorator {
//   return As((target: GenericClass<T>, propertyKey: DecoratorPropertyKey | undefined, parameterIndex: number): void => {
//     RegistryUtils.registerParameter(target, static_, details||{}, propertyKey, parameterIndex);
//   })
// }

function PropertyReflect<T>(static_: boolean, details: Partial<RegistryProperty<T>>): PropertyDecorator {
  return As((target: GenericClass<T>, propertyKey: DecoratorPropertyKey): void => {
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