import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { BetterClassAssign, EntriesReturn, GenericClass } from "@ts-natives/object/interfaces/object-interfaces";

class RegistryBaseInfo<T> {
  type?: GenericClass<T>|string;
  description?: string;
  onAssign?: Function

  assign(...values: Partial<BetterClassAssign<this>>[]): this {
    values.forEach((value: Partial<BetterClassAssign<this>>): void => {
      (Object.entries(value) as EntriesReturn<this>[])
      .forEach(([key, val]: EntriesReturn<this>): void => {
        this[key] = val;
      })
    })
    return this
  }
}

class RegistryClass<T> extends RegistryBaseInfo<T> {
  Class!: GenericClass<T>;
  staticDetails!: RegistryClassDetails<T>;
  instanceDetails!: RegistryClassDetails<T>;
}

class RegistryClassDetails<T> {
  methods: RegistryFunction<T>[] = []
  properties: RegistryProperty<T>[] = []
  symbols: RegistryProperty<T>[] = []
}

class RegistryKey<T> extends RegistryBaseInfo<T> {
  name?: KeyOf<T>
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