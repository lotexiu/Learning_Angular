import { As } from "@ts-extras/generic-utils";
import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { ClassRegistry } from "./interfaces/registry-interfaces";
import { RegistryClass, RegistryFunction, RegistryFunctionArg, RegistryProperty } from "./classes/registry-classes";
import { isAClassDeclaration, ObjectUtils } from "@ts-natives/object/object-utils";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { EnumRegistry } from "./enum/enum-registry";
import { FunctionUtils } from "@ts-natives/functions/function-utils";

class RegistryUtils {
  static classRegistry: ClassRegistry = {}

  private static addClassInToWindows<T>(class_: GenericClass<T>): void {
    const betterName: string = class_.name.replace(/^_|\d+$/g, '');
    As(window)[betterName] = class_;
  }

  private static getOrAddRegistryClass<T>(class_: GenericClass<T>): RegistryClass<T> {
    if (!this.classRegistry[class_.name]) {
      this.initRegistryClass(class_);
    }
    return this.classRegistry[class_.name]
  }

  private static initRegistryClass<T>(classOrInstance: GenericClass<T>): RegistryClass<T> {
    const registryClass = new RegistryClass<T>();
    let key: 'staticDetails'|'instanceDetails';
    if (isAClassDeclaration(classOrInstance)) {
      registryClass.class = classOrInstance;
      key = 'staticDetails'
    } else {
      registryClass.class = classOrInstance.constructor as GenericClass<T>;
      key = 'instanceDetails'
    }
    registryClass.type = registryClass.class;
    registryClass.description = `${registryClass.class.name} class (Default description)`;
    registryClass[key].methods = this.initialMethodDetails(As(classOrInstance))
    registryClass[key].properties = this.initialPropertyDetails(As(classOrInstance))
    registryClass[key].symbols = this.initialSymbolDetails(As(classOrInstance));
    return registryClass;
  }

  private static initialMethodDetails<T>(classOrInstance: T): RegistryFunction<T>[] {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(classOrInstance))
    const methods: RegistryFunction<T>[] = keys
    .filter((key: KeyOf<T>): boolean => typeof classOrInstance[key] === 'function')
    .map((key: KeyOf<T>): RegistryFunction<T> => {
      const method: RegistryFunction<T> = new RegistryFunction<T>();
      method.description = `${method.name} method (Default description)`;

      const basicDetails = FunctionUtils.functionsDetails(As(classOrInstance[key]));
      ObjectUtils.updateObject(method, basicDetails);
      method.returnType = EnumRegistry.UNKOWN;

      method.args = As<string[]>(method.args!).map((argName: string): RegistryFunctionArg<T> => {
        const arg = new RegistryFunctionArg<T>();
        arg.name = argName;
        arg.description = `${arg.name} argument (Default)`;
        arg.default = EnumRegistry.UNKOWN;
        arg.type = EnumRegistry.UNKOWN;
        return arg;
      })

      return method;
    });

    return methods;
  }

  static initialPropertyDetails<T>(classOrInstance: T): RegistryProperty<T>[] {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(classOrInstance))
    const properties: RegistryProperty<T>[] = keys
    .filter((key: KeyOf<T>): boolean => !['function','symbol'].includes(typeof classOrInstance[key]))
    .map((key: KeyOf<T>): RegistryProperty<T> => {
      const property: RegistryProperty<T> = new RegistryProperty<T>();
      property.name = As(key);
      property.description = `${property.name} property (Default description)`;
      property.default = EnumRegistry.UNKOWN;
      property.type = EnumRegistry.UNKOWN;
      return property;
    });

    return properties;
  }

  static initialSymbolDetails<T>(classOrInstance: T): RegistryProperty<T>[] {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(classOrInstance))
    const symbols: any[] = keys
    .filter((key: KeyOf<T>): boolean => typeof classOrInstance[key] === 'symbol')
    .map((key: KeyOf<T>): any => {
      const symbol: any = new RegistryProperty<T>();
      symbol.name = As(key);
      symbol.description = `${symbol.name} symbol (Default description)`;
      symbol.default = EnumRegistry.UNKOWN;
      symbol.type = EnumRegistry.UNKOWN;
      return symbol;
    });

    return symbols;
  }
}
