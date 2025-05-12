import { DeepPartial, Object } from "@ts-natives/object/interfaces/object-interfaces";
import { ClassRegistry } from "./interfaces/registry-interfaces";
import { RegistryClass, RegistryClassDetails, RegistryFunction, RegistryFunctionArg, RegistryProperty } from "./model/registry-classes";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { DecoratorPropertyKey } from "./decorators/interfaces/decorators-interfaces";
import { Function } from "@ts-natives/functions/interfaces/function-interfaces";
import { AnyClass, Prototype } from "@ts-interfaces/misc-interfaces";
import { _Generic } from "@ts-extras/internal";
import { _Object } from "@ts-natives/object/internal";
import { _Function } from "@ts-natives/functions/internal";

const {As} = _Generic;
const {isAClassDeclaration} = _Object;
const {functionsDetails} = _Function;

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
    this.initIfNotExists(instance, description);
  }

  static getOrAddRegistryClass<T>(data: AnyClass<T>|Prototype<T>|Object<T>): RegistryClass<T> {
    return this.initIfNotExists(data);
  }

  static initIfNotExists<T>(
    data: AnyClass<T>|Prototype<T>|Object<T>,
    description?: string
  ): RegistryClass<T> {
    let class_: AnyClass<T>;
    let objOrProto: Prototype<T>|Object<T>;
    if (isAClassDeclaration(data)){
      class_ = data;
      objOrProto = data.prototype;
    } else {
      class_ = data.constructor as AnyClass<T>;
      objOrProto = data;
    }
    if (!this.classRegistry[class_.name]) {
      this.registryClass(class_,description);
    }
    if (!this.classRegistry[class_.name].instanceDetails) {
      const instanceDetails: RegistryClassDetails<T> = this.initRegistryClass(objOrProto,description).instanceDetails
      this.classRegistry[class_.name].instanceDetails = instanceDetails;
    }
    return this.classRegistry[class_.name];
  }
  
  static registerMethod<T>(
    proto: Prototype<T>, 
    static_: boolean, 
    details: DeepPartial<RegistryFunction<T>>, 
    propertyKey: DecoratorPropertyKey, 
    descriptor: TypedPropertyDescriptor<T>
  ): void {
    const methodDetails: RegistryFunction<T> = this.getMethod(proto, static_, propertyKey as string);
    methodDetails.assign(details);
  }

  static registerProperty<T>(
    proto: Prototype<T>, 
    static_: boolean, 
    details: DeepPartial<RegistryProperty<T>>, 
    propertyKey: DecoratorPropertyKey): void {
    const propertyDetails: RegistryProperty<T> = this.getProperty<T>(proto, static_, propertyKey as string);
    propertyDetails.assign(details);
  }

  static getMethod<T>(class_: AnyClass<T>|Prototype<T>, static_: boolean, methodName: string): RegistryFunction<any> {
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

  static getProperty<T>(target: AnyClass<T>|Prototype<T>, static_: boolean, propertyKey: any): RegistryProperty<T> {
    const find: Function = (property: RegistryProperty<T>): boolean => property.name === propertyKey
    const registryClass: RegistryClass<T> = this.getOrAddRegistryClass(target);
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

  private static initRegistryClass<T>(
    data: AnyClass<T>|Object<T>|Prototype<T>, 
    description?: string
  ): RegistryClass<T> {
    const registryClass = new RegistryClass<T>();
    let key: 'staticDetails'|'instanceDetails';
    if (isAClassDeclaration<T>(data)) {
      registryClass.Class = data;
      key = 'staticDetails'
    } else {
      registryClass.Class = data.constructor as AnyClass<T>;
      key = 'instanceDetails'
    }
    registryClass.type = registryClass.Class;
    registryClass.description = description || `${registryClass.Class.name} class (Default)`;
    registryClass[key] = new RegistryClassDetails<T>()
    registryClass[key].methods = this.initialMethodDetails<T>(data as T)
    registryClass[key].properties = this.initialPropertyDetails<T>(data as T)
    registryClass[key].symbols = this.initialSymbolDetails<T>(data as T);
    return registryClass;
  }

  private static initialMethodDetails<T>(data: T): RegistryFunction<T>[] {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(data))
    const methods: RegistryFunction<T>[] = keys
    .filter((key: KeyOf<T>): boolean => {
      return typeof data[key] === 'function' && key !== 'constructor'
    })
    .map((key: KeyOf<T>): RegistryFunction<T> => {
      const method: RegistryFunction<T> = new RegistryFunction<T>();
      method.assign(functionsDetails(data[key] as Function));
      method.assign({
        description: `${String(method.name)} method (Default)`,
        default: data[key],
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
    if (target.constructor.name != 'Object' && registry.instanceDetails) {
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
RegistryUtils.getOrAddRegistryClass(RegistryUtils);

export {
  RegistryUtils
}