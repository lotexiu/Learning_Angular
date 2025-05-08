import { As } from "@ts-extras/generic-utils";
import { DeepPartial, Object } from "@ts-natives/object/interfaces/object-interfaces";
import { ClassRegistry } from "./interfaces/registry-interfaces";
import { RegistryClass, RegistryClassDetails, RegistryFunction, RegistryFunctionArg, RegistryProperty } from "./model/registry-classes";
import { isAClassDeclaration } from "@ts-natives/object/object-utils";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { FunctionUtils } from "@ts-natives/functions/function-utils";
import { DecoratorPropertyKey } from "./decorators/interfaces/decorators-interfaces";
import { Function } from "@ts-natives/functions/interfaces/function-interfaces";
import { AnyClass } from "@ts-interfaces/misc-interfaces";

class RegistryUtils {
  static classRegistry: ClassRegistry = {}

  private static addClassInToWindows<T>(class_: AnyClass<T>): void {
    const betterName: string = class_.name.replace(/^_|\d+$/g, '');
    As(window)[betterName] = class_;
  }

  static registryClass<T>(class_: AnyClass<T>, description?: string): RegistryClass<T> {
    class_.name
    if (!this.classRegistry[class_.name]) {
      this.classRegistry[class_.name] = this.initRegistryClass(class_, description);
      this.addClassInToWindows(class_);
    }
    if (description) {
      this.classRegistry[class_.name].description = description;
    }
    return this.classRegistry[class_.name];
  }
  
  static registryClassByInstance<T>(instance: Object<T>, description?: string): void {
    const class_: AnyClass<T> = instance.constructor as AnyClass<T>;
    if (!this.classRegistry[class_.name]) {
      this.registryClass(class_, description);
    }
    if (!this.classRegistry[class_.name].instanceDetails) {
      const instanceDetails: RegistryClassDetails<T> = this.initRegistryClass(instance, description).instanceDetails
      this.classRegistry[class_.name].instanceDetails = instanceDetails;
    }
  }

  static getOrAddRegistryClass<T>(classOrInstance: AnyClass<T>|Object<T>): RegistryClass<T> {
    if (isAClassDeclaration(classOrInstance)) {
      if (!this.classRegistry[As<AnyClass<T>>(classOrInstance).name]) {
        this.registryClass(As<AnyClass<T>>(classOrInstance));
      }
      return this.classRegistry[As<AnyClass<T>>(classOrInstance).name]
    } else {
      if (!this.classRegistry[classOrInstance.constructor.name]) {
        this.registryClassByInstance(classOrInstance);
      }
      return this.classRegistry[classOrInstance.constructor.name]
    }
  }
  
  static registerMethod<T>(
    class_: AnyClass<T>, 
    static_: boolean, 
    details: DeepPartial<RegistryFunction<T>>, 
    propertyKey: DecoratorPropertyKey, 
    descriptor: TypedPropertyDescriptor<T>
  ): void {
    const methodDetails: RegistryFunction<T> = this.getMethod(class_, static_, As(propertyKey));
    methodDetails.assign(details);
  }

  static registerProperty<T>(
    target: AnyClass<T>, 
    static_: boolean, 
    details: DeepPartial<RegistryProperty<T>>, 
    propertyKey: DecoratorPropertyKey): void {
    const propertyDetails: RegistryProperty<T> = this.getProperty(target, static_, As(propertyKey));
    propertyDetails.assign(details);
  }

  static getMethod(class_: AnyClass<any>, static_: boolean, methodName: string): RegistryFunction<any> {
    const find: Function = (method: RegistryFunction<any>): boolean => method.name === methodName

    const registryClass: RegistryClass<any> = this.getOrAddRegistryClass(class_);
    if (static_) {
      const method: RegistryFunction<any> = registryClass.staticDetails.methods.find(find) || new RegistryFunction<any>();
      if (!registryClass.staticDetails.methods.includes(method)) {
        registryClass.staticDetails.methods.push(method);
      }
      return method;
    } else {
      const method: RegistryFunction<any> = registryClass.instanceDetails.methods.find(find) || new RegistryFunction<any>();
      if (!registryClass.instanceDetails.methods.includes(method)) {
        registryClass.instanceDetails.methods.push(method);
      }
      return method;
    }
  }

  static getProperty<T>(target: AnyClass<T>, static_: boolean, propertyKey: any): RegistryProperty<T> {
    const find: Function = (property: RegistryProperty<T>): boolean => property.name === propertyKey
    const registryClass: RegistryClass<T> = As(this.getOrAddRegistryClass(target));
    if (static_) {
      const property: RegistryProperty<T> = registryClass.staticDetails.properties.find(find) || new RegistryProperty<T>().assign({name:propertyKey});
      if (!registryClass.staticDetails.properties.includes(property)) {
        registryClass.staticDetails.properties.push(property);
      }
      return property;
    } else {
      const property: RegistryProperty<T> = registryClass.instanceDetails.properties.find(find) || new RegistryProperty<T>().assign({name:propertyKey});
      if (!registryClass.instanceDetails.properties.includes(property)) {
        registryClass.instanceDetails.properties.push(property);
      }
      return property;
    }
  }

  private static initRegistryClass<T>(classOrInstance: AnyClass<T>|Object<T>, description?: string): RegistryClass<T> {
    const registryClass = new RegistryClass<T>();
    let key: 'staticDetails'|'instanceDetails';
    if (isAClassDeclaration(classOrInstance)) {
      registryClass.Class = As(classOrInstance);
      key = 'staticDetails'
    } else {
      registryClass.Class = classOrInstance.constructor as AnyClass<T> & T;
      key = 'instanceDetails'
    }
    registryClass.type = registryClass.Class;
    registryClass.description = description || `${registryClass.Class.name} class (Default)`;
    registryClass[key] = new RegistryClassDetails<T>()
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
      method.assign(FunctionUtils.functionsDetails(As(classOrInstance[key])))
      method.assign({
        description: `${String(method.name)} method (Default)`,
        default: classOrInstance[key],
        type: 'Function',
        returnType: undefined,
        args: As<KeyOf<T>[]>(method.args!).map((argName: KeyOf<T>): RegistryFunctionArg<T> => {
          const arg = new RegistryFunctionArg<T>();
          arg.assign({
            name: argName,
            description: `${String(arg.name)} argument (Default)`,
            default: undefined,
            type: undefined,
          })
          return arg;
        })
      })
      return method;
    });

    return methods;
  }

  private static initialPropertyDetails<T>(classOrInstance: T): RegistryProperty<T>[] {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(classOrInstance))
    const properties: RegistryProperty<T>[] = keys
    .filter((key: KeyOf<T>): boolean => !['function','symbol'].includes(typeof classOrInstance[key]))
    .map((key: KeyOf<T>): RegistryProperty<T> => {
      const property: RegistryProperty<T> = new RegistryProperty<T>();
      property.assign({
        name: key,
        description: `${String(property.name)} property (Default)`,
        default: undefined,
        type: undefined,
      })
      return property;
    });

    return properties;
  }

  private static initialSymbolDetails<T>(classOrInstance: T): RegistryProperty<T>[] {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(classOrInstance))
    const symbols: RegistryProperty<T>[] = keys
    .filter((key: KeyOf<T>): boolean => typeof classOrInstance[key] === 'symbol')
    .map((key: KeyOf<T>): RegistryProperty<T> => {
      const symbol = new RegistryProperty<T>();
      symbol.assign({
        name: key,
        description: `${String(symbol.name)} symbol (Default)`,
        default: undefined,
        type: undefined,
      });
      return symbol;
    });

    return symbols;
  }

  static assignObject<T extends Object>(target: T, ...sources: DeepPartial<T>[]): void {
    let registry: RegistryClass<T> = this.registryClass(target.constructor as any) as any
    if (registry.instanceDetails) {
      sources.forEach((source: DeepPartial<T>): void => {
        registry.instanceDetails.properties.forEach((property: RegistryProperty<T>): void => {
          if (property.name && property.name in source) {
            const value: any = source[property.name as KeyOf<DeepPartial<T>>];
            if (value !== undefined) {
              if (property.onAssign) {
                target[property.name] = property.onAssign(value, registry.type);
              } else {
                if (typeof property.type == 'function') {
                  target[property.name] = ((new property.type()) as any).assign(value);
                } else {
                  target[property.name] = value;
                }
              }
            }
          }
        })
      })
    } else {
      Object.assign(target, ...sources);
    }
  }
}
RegistryUtils.getOrAddRegistryClass(RegistryUtils)

export {
  RegistryUtils
}