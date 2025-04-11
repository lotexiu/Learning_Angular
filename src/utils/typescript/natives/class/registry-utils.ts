import { As } from "@ts-extras/generic-utils";
import { Parameters } from "@ts-interfaces/function-interfaces";
import { GenericClass, KeysOfType, Object } from "@ts-natives/object/interfaces/object-interfaces";

class RegistryBaseInfo<T> {
  type?: GenericClass<T>|string;
  description?: string;
}

class RegistryClass<T> extends RegistryBaseInfo<T> {
  class?: GenericClass<T>;
  staticDetails?: RegistryClassDetails<T>;
  instanceDetails?: RegistryClassDetails<T>;
}

class RegistryClassDetails<T> {
  methods?: RegistryFunction<T>[]
  properties?: RegistryProperty<T>[]
  symbols?: any
}

class RegistryKey<T> extends RegistryBaseInfo<T> {
  name: string = ''
  default: any
}

class RegistryFunction<T> extends RegistryKey<T> {
  args?: any //RegistryFunctionArg<T>[]
  totalMandatoryArgs?: number
  returnType?: any
}

class RegistryFunctionArg<T> extends RegistryKey<T> {
  defaultValue?: any
}

class RegistryProperty<T> extends RegistryKey<T> {

  defaultValue?: any
}

class RegistryUtils {
  private static addClassInToWindows<T>(class_: GenericClass<T>): void {
    const betterName: string = class_.name.replace(/^_|\d+$/g, '');
    As(window)[betterName] = class_;
  }

  // private 
  
}
