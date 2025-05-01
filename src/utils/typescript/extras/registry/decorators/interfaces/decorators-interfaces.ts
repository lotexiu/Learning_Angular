import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";


interface IDecoratorClassInfo {
  name: string|number|symbol
  type: any|string
  description: string
  defaultValue?: any
}

interface IDecoratorClassKey extends IDecoratorClassInfo{
}

interface IDecoratorClassArgFunction extends IDecoratorClassInfo {
  inf: boolean
}

interface IDecoratorClassKeyFunction extends IDecoratorClassKey{
  returnType: string
  args: IDecoratorClassArgFunction[]
  totalArgs: number
}

interface IDecoratorClassDetails {
  methods: IDecoratorClassKeyFunction[]
  properties: IDecoratorClassKey[]
}

interface IDecoratorClass<T=any> extends IDecoratorClassKey{
  class: GenericClass<T>
  staticDetail: IDecoratorClassDetails
  instanceDetails: IDecoratorClassDetails
}

type IClassDecorator<T> = (target: Function) => T | void;

type IDecoratorPropertyKey = string | symbol

type IMethodDecorator<T> = (
  target: Object, 
  propertyKey: IDecoratorPropertyKey, 
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

type IParameterDecorator = (
  target: Object, 
  propertyKey: IDecoratorPropertyKey | undefined, 
  parameterIndex: number
) => void;

type IPropertyDecorator = (
  target: Object, 
  propertyKey: IDecoratorPropertyKey
) => void;


export {
  IClassDecorator as ClassDecorator,
  IDecoratorClassKey as DecoratorClassKey,
  IParameterDecorator as ParameterDecorator,
  IPropertyDecorator as PropertyDecorator,
  IMethodDecorator as MethodDecorator,
  IDecoratorClass as DecoratorClass,
  IDecoratorClassKeyFunction as DecoratorClassKeyFunction,
  IDecoratorClassArgFunction as DecoratorClassArgFunction,
  IDecoratorClassDetails as DecoratorClassDetails,
  IDecoratorClassInfo as DecoratorClassInfo,
  IDecoratorPropertyKey as DecoratorPropertyKey,
};
