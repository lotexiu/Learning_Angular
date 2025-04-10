import { mathPow, mathRandom } from "@ts-natives/math/math-utils";
import { ClassRegistry } from "./interfaces/class-interfaces";
import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { DecoratorClassArgsFunction, DecoratorClassDetails, DecoratorClass, DecoratorClassKey, DecoratorClassKeyFunction, DecoratorPropertyKey } from "./decorators/interfaces/decorators-interfaces";
import { ClassReflect, MethodReflect } from "./decorators/decorators";
import { FunctionUtils } from "@ts-natives/functions/function-utils";
import { As } from "@ts-extras/generic-utils";
import { isNull } from "@ts-natives/object/object-utils";
import { Nullable } from "@ts-interfaces/misc-interfaces";

@ClassReflect('Utility class for handling class-related operations')
class ClassUtils {
  static classRegistry: ClassRegistry = {}

  private static addClassInToWindows<T>(class_: GenericClass<T>): void {
    const betterName: string = class_.name.replace(/^_|\d+$/g, '');
    As(window)[betterName] = class_;
  }

  static getOrAddRegistry<T>(class_: GenericClass<T>): DecoratorClass<T> {
    if (!this.classRegistry[class_.name]) {
      this.buildClassDetails(class_);
    }
    return this.classRegistry[class_.name];
  }

  @MethodReflect(true, {
    description: 'Get the class registry for a given class',
    returnType: 'DecoratorClass<T>',
    defaultValue: null,
  })
  static registry<T>(class_: GenericClass<T>): DecoratorClass<T> {
    return this.classRegistry[class_.name]
  }

  static registerProperty<T>(class_: GenericClass<T>, static_: boolean, propertyKey: DecoratorPropertyKey, description?: string): void {
    throw new Error("Method not implemented.");
  }

  static registerParameter<T>(class_: GenericClass<T>, static_: boolean, propertyKey: DecoratorPropertyKey | undefined, parameterIndex: number, description?: string): void {
    throw new Error("Method not implemented.");
  }
  
  static registerMethod<T>(class_: GenericClass<T>, static_: boolean, details: Partial<DecoratorClassKeyFunction>, propertyKey: DecoratorPropertyKey, descriptor: TypedPropertyDescriptor<T>): void {
    const classDetails: DecoratorClass = this.getOrAddRegistry(class_);
    const methodDetails: Nullable<DecoratorClassKeyFunction> = static_ ?
      classDetails.staticDetail.methods.find((method: DecoratorClassKeyFunction): boolean => method.name === propertyKey) :
      classDetails.instanceDetails?.methods.find((method: DecoratorClassKeyFunction): boolean => method.name === propertyKey);

    if (!methodDetails) {
      return /* TODO Criar caso esteja nulo */
    }
    methodDetails.returnType = details.returnType || 'unkown';
    methodDetails.defaultValue = details.defaultValue || null;
    methodDetails.description =  details.description || '';
  }

  static registerClass<T>(class_: GenericClass<T>, description?: string): void {
    if (class_ && class_.name) {
      const registry: DecoratorClass<T> = this.getOrAddRegistry(class_)
      registry.description = description || '';
    }
    this.addClassInToWindows(class_);
  }

  static buildClassDetails(class_: GenericClass<any>, description?: string): void {
    this.classRegistry[class_.name] = {
      name: class_.name,
      type: "Class",
      description: description||'',
      class: class_,
      staticDetail: this.buildDetail(class_)
    }
  }

  /**
   * Extrai os detalhes (métodos e propriedades) de uma instância ou classe
   * @param instanceOrClass - A instância ou classe para análise
   */
  private static buildDetail<T>(instanceOrClass: T): DecoratorClassDetails {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(instanceOrClass));
    
    return {
      methods: this.buildMethodsDetail(instanceOrClass, keys),
      properties: this.buildPropertiesDetail(instanceOrClass, keys),
    };
  }

  /**
   * Extrai informações detalhadas sobre os métodos de uma instância ou classe
   * @param instanceOrClass - A instância ou classe para análise
   * @param keys - Lista de chaves a serem verificadas
   */
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
   * Constrói os detalhes de um argumento de função
   * @param arg - String representando o nome do argumento
   */
  private static buildArgsDetail(arg: string): DecoratorClassArgsFunction {
    const isRestParam = arg.startsWith('...');
    
    return {
      name: arg.replaceAll('.', ''),
      type: "Argument",
      description: "",
      inf: isRestParam,
      defaultValue: 'unkown',
    };
  }
  
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
   * @returns {string}
   */
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
