import { mathPow, mathRandom, MathUtils } from "@ts-natives/math/math-utils";
import { ClassRegistry } from "./interfaces/class-interfaces";
import { ConcatStrIntoKeys, GenericClass, KeysOfType } from "@ts-natives/object/interfaces/object-interfaces";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { DecoratorClassArgFunction, DecoratorClassDetails, DecoratorClass, DecoratorClassKey, DecoratorClassKeyFunction, DecoratorPropertyKey } from "../../extras/registry/decorators/interfaces/decorators-interfaces";
import { ClassReflect, MethodReflect } from "../../extras/registry/decorators/decorators";
import { FunctionUtils } from "@ts-natives/functions/function-utils";
import { As } from "@ts-extras/generic-utils";
import { isNull, ObjectUtils } from "@ts-natives/object/object-utils";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { Class } from "./model/class";

@ClassReflect('Utility class for handling class-related operations')
class ClassUtils {
  static classRegistry: ClassRegistry = {}

  /**
   * Adds a class to the global window object.
   * @param class_ - The class to add to the global window object.
   */
  @MethodReflect(true, {
    description: 'Adds a class to the global window object',
    returnType: 'void',
  })
  private static addClassInToWindows<T>(class_: GenericClass<T>): void {
    const betterName: string = class_.name.replace(/^_|\d+$/g, '');
    As(window)[betterName] = class_;
  }

  /**
   * Gets or adds a registry for a given class.
   * @param class_ - The class to get or add to the registry.
   * @returns The registry for the class.
   */
  @MethodReflect(true, {
    description: 'Gets or adds a registry for a given class',
    returnType: 'DecoratorClass<T>',
  })
  static getOrAddRegistry<T>(class_: GenericClass<T>): DecoratorClass<T> {
    if (!this.classRegistry[class_.name]) {
      this.buildClassDetails(class_);
    }
    const registry: DecoratorClass = this.classRegistry[class_.name];
    registry.instanceDetails = registry.instanceDetails || {
      methods: [],
      properties: [],
    }
    return registry
  }

  static getMethod(class_: GenericClass<any>, static_: boolean, methodName: string): DecoratorClassKeyFunction {
    const classDetails: DecoratorClass = this.getOrAddRegistry(class_);
    let methodDetails: Nullable<DecoratorClassKeyFunction>;
    if (static_){
      methodDetails = classDetails.staticDetail.methods.find(
        (method: DecoratorClassKeyFunction): boolean => method.name === methodName
      );
    } else {
      methodDetails = classDetails.instanceDetails.methods.find(
        (method: DecoratorClassKeyFunction): boolean => method.name === methodName
      );
    }

    if (!methodDetails) {
      methodDetails = As({
        name: methodName,
        type: "Method",
        description: "",
        returnType: 'unknown',
        args: [],
      });
      if (static_) {
        classDetails.staticDetail.methods.push(methodDetails!);
      } else {
        classDetails.instanceDetails.methods.push(methodDetails!);
      }
    }

    return methodDetails!
  }

  /**
   * Gets the class registry for a given class.
   * @param class_ - The class to retrieve the registry for.
   * @returns The registry for the class.
   */
  @MethodReflect(true, {
    description: 'Gets the class registry for a given class',
    returnType: 'DecoratorClass<T>',
  })
  static registry<T>(class_: GenericClass<T>): DecoratorClass<T> {
    return this.classRegistry[class_.name]
  }

  @MethodReflect(true, {
    description: 'Registers a property for a class with an optional description',
    returnType: 'void',
  })
  static registerProperty<T>(
    class_: GenericClass<T>, 
    static_: boolean, 
    details: Partial<DecoratorClassArgFunction>,
    propertyKey: DecoratorPropertyKey, 
  ): void {
    throw new Error("Method not implemented.");
  }

  @MethodReflect(true, {
    description: 'Registers a parameter for a class method with an optional description',
    returnType: 'void',
  })
  static registerParameter<T>(
    class_: GenericClass<T>, 
    static_: boolean, 
    details: Partial<DecoratorClassArgFunction>, 
    propertyKey: DecoratorPropertyKey | undefined, 
    parameterIndex: number
  ): void {
    const methodDetails: DecoratorClassKeyFunction = this.getMethod(class_, static_, As(propertyKey));
    methodDetails.args.find((arg: DecoratorClassArgFunction, idx: number): boolean=> idx === parameterIndex);

    
  }
  
  /**
   * Registers a method for a class.
   * @param class_ - The class to register the method for.
   * @param static_ - Whether the method is static.
   * @param details - Partial details of the method.
   * @param propertyKey - The property key of the method.
   * @param descriptor - The property descriptor of the method.
   */
  @MethodReflect(true, {
    description: 'Registers a method for a class',
    returnType: 'void',
  })
  static registerMethod<T>(
    class_: GenericClass<T>, 
    static_: boolean, 
    details: Partial<DecoratorClassKeyFunction>, 
    propertyKey: DecoratorPropertyKey, 
    descriptor: TypedPropertyDescriptor<T>
  ): void {
    const methodDetails: DecoratorClassKeyFunction = this.getMethod(class_, static_, As(propertyKey));
    ObjectUtils.updateObject(methodDetails, details);
  }

  /**
   * Registers a class with an optional description.
   * @param class_ - The class to register.
   * @param description - An optional description for the class.
   */
  @MethodReflect(true, {
    description: 'Registers a class with an optional description',
    returnType: 'void',
  })
  static registerClass<T>(class_: GenericClass<T>, description?: string): void {
    if (class_ && class_.name) {
      const registry: DecoratorClass<T> = this.getOrAddRegistry(class_)
      registry.description = description || '';
    }
    this.addClassInToWindows(class_);
  }

  @MethodReflect(true, {
    description: 'Builds the class details and adds it to the registry',
    returnType: 'void',
  })
  static buildClassDetails(class_: GenericClass<any>, description?: string): void {
    this.classRegistry[class_.name] = As({
      name: class_.name,
      type: "Class",
      description: description||'',
      class: class_,
      staticDetail: this.buildDetail(class_)
    })
  }

  /**
   * Extracts the details (methods and properties) of an instance or class.
   * @param instanceOrClass - The instance or class to analyze.
   */
  @MethodReflect(true, {
    description: 'Extracts the details (methods and properties) of an instance or class',
    returnType: 'DecoratorClassDetails',
  })
  private static buildDetail<T>(instanceOrClass?: T, details?: DecoratorClassKeyFunction): DecoratorClassDetails {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(instanceOrClass));
    if (instanceOrClass) {
      return {
        methods: this.buildMethodsDetail(instanceOrClass, keys),
        properties: this.buildPropertiesDetail(instanceOrClass, keys),
      };
    } else {
      return {
        methods: [details!],
        properties: [],
      }
    }
  }

  /**
   * Extracts detailed information about the methods of an instance or class.
   * @param instanceOrClass - The instance or class to analyze.
   * @param keys - List of keys to check.
   */
  @MethodReflect(true, {
    description: 'Extracts detailed information about the methods of an instance or class',
    returnType: 'DecoratorClassKeyFunction[]',
  })
  private static buildMethodsDetail<T>(instanceOrClass: T, keys: KeyOf<T>[]): DecoratorClassKeyFunction[] {
    return keys
      .filter((key: KeyOf<T>): boolean => typeof instanceOrClass[key] === 'function')
      .map((key: KeyOf<T>): DecoratorClassKeyFunction => {
        const func: Function = As(instanceOrClass)[key];
        const funcDetails: DecoratorClassKeyFunction = As(FunctionUtils.functionsDetails(func));
        const args: string[] = As<string[]>(funcDetails.args);

        funcDetails.args = args.map(arg => this.buildArgsDetail(arg));
        funcDetails.type = "Method";
        funcDetails.description = "";
        funcDetails.returnType = 'unkown';
        
        return funcDetails;
      });
  }

  /**
   * Builds the details of a function argument.
   * @param arg - String representing the argument name.
   */
  @MethodReflect(true, {
    description: 'Builds the details of a function argument',
    returnType: 'DecoratorClassArgsFunction',
  })
  private static buildArgsDetail(arg: string): DecoratorClassArgFunction {
    const isRestParam = arg.startsWith('...');
    
    return {
      name: arg.replaceAll('.', ''),
      type: "Argument",
      description: "",
      inf: isRestParam,
      defaultValue: 'unkown',
    };
  }
  
  /**
   * Builds the details of a property.
   * @param instanceOrClass - The instance or class to analyze.
   * @param keys - List of keys to check.
   */
  @MethodReflect(true, {
    description: 'Builds the details of a property',
    returnType: 'DecoratorClassKey[]',
  })
  static buildPropertiesDetail<T>(instanceOrClass: T, keys: KeyOf<T>[]): DecoratorClassKey[] {
    const properties: DecoratorClassKey[] = [];
    keys.filter((key: KeyOf<T>): boolean => typeof instanceOrClass[key] != 'function')
    .forEach((key: KeyOf<T>): void => {
      const prop: any = As(instanceOrClass)[key];
      const propDetails: DecoratorClassKey = {
        name: key,
        type: isNull(prop) ? 'unkown' : typeof prop,
        description: "",
        defaultValue: prop,
      };
      properties.push(propDetails)
    })
    return properties
  }

  /**
   * Generates a new ID based on the current date and a random number.
   * @returns {string} A new unique ID.
   */
  @MethodReflect(true, {
    description: 'Generates a new ID based on the current date and a random number',
    returnType: 'string',
  })
  static newId(): string {
    const date: string = new Date(mathPow(mathRandom(6.5, 9.99),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length["/"](2)));
  }
}

export {
  ClassUtils
};

const {
  newId,
} = ClassUtils

export {
  newId
};
