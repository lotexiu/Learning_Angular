import { mathPow, mathRandom } from "@ts-natives/math/math-utils";
import { ClassRegistry } from "./interfaces/class-interfaces";
import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { KeyOf } from "@ts-natives/object/interfaces/native-object-interfaces";
import { DecoratorArgsFunction, DecoratorClassDetails, DecoratorClassInfo, DecoratorClassKey, DecoratorClassKeyFunction } from "./decorators/interfaces/decorators-interfaces";
import { ClassReflect } from "./decorators/class-decorators";
import { FunctionUtils } from "@ts-natives/functions/function-utils";
import { As } from "@ts-extras/generic-utils";
import { isNull } from "@ts-natives/object/object-utils";

@ClassReflect()
class ClassUtils {
  static classRegistry: ClassRegistry = {}

  private static addClassInToWindows<T>(class_: GenericClass<T>): void {
    const betterName: string = class_.name.replace(/^_|\d+$/g, '');
    As(window)[betterName] = class_;
  }

  static registry<T>(class_: GenericClass<T>): DecoratorClassInfo<T> {
    return this.classRegistry[class_.name]
  }

  static registerClass<T>(class_: GenericClass<T>, description?: string): void {
    if (class_ && class_.name) {
      ClassUtils.buildClassDetails(class_, description);
    }
    this.addClassInToWindows(class_);
  }

  static buildClassDetails(class_: GenericClass<any>, description?: string): void {
    this.classRegistry[class_.name] = {
      name: class_.name,
      type: "Class",
      description: description||'',
      class: class_,
      staticDetail: ClassUtils.buildDetail(class_)
    }
  }

  /**
   * Extrai os detalhes (métodos e propriedades) de uma instância ou classe
   * @param instanceOrClass - A instância ou classe para análise
   */
  private static buildDetail<T>(instanceOrClass: T): DecoratorClassDetails {
    const keys: KeyOf<T>[] = As(Object.getOwnPropertyNames(instanceOrClass));
    
    return {
      methods: ClassUtils.buildMethodsDetail(instanceOrClass, keys),
      properties: ClassUtils.buildPropertiesDetail(instanceOrClass, keys),
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

        funcDetails.args = args.map(arg => ClassUtils.buildArgsDetail(arg));
        funcDetails.type = "Method";
        funcDetails.description = "";
        
        return funcDetails;
      });
  }

  /**
   * Constrói os detalhes de um argumento de função
   * @param arg - String representando o nome do argumento
   */
  private static buildArgsDetail(arg: string): DecoratorArgsFunction {
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
  ClassUtils,
}

const {
  newId,
} = ClassUtils

export {
  newId,
}