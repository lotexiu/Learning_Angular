import { Class } from "@ts-natives/class/model/class";
import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";

class RegistryBaseInfo<T> extends Class {
  type?: GenericClass<T>|string;
  description?: string;
}

class RegistryClass<T> extends RegistryBaseInfo<T> {
  class!: GenericClass<T>;
  staticDetails: RegistryClassDetails<T> = new RegistryClassDetails<T>();
  instanceDetails: RegistryClassDetails<T> = new RegistryClassDetails<T>();
}

class RegistryClassDetails<T> {
  methods: RegistryFunction<T>[] = []
  properties: RegistryProperty<T>[] = []
  symbols: RegistryProperty<T>[] = []
}

class RegistryKey<T> extends RegistryBaseInfo<T> {
  name: string | number | symbol = ''
  default: any
}

class RegistryFunction<T> extends RegistryKey<T> {
  args?: RegistryFunctionArg<T>[]
  totalMandatoryArgs?: number
  returnType?: any
}

class RegistryFunctionArg<T> extends RegistryKey<T> {
}

class RegistryProperty<T> extends RegistryKey<T> {
}

export {
  RegistryBaseInfo,
  RegistryClass,
  RegistryClassDetails,
  RegistryKey,
  RegistryFunction,
  RegistryFunctionArg,
  RegistryProperty,
}