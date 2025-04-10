import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";


interface IDecoratorClassInfo {
  name: string|number|symbol
  type: string
  description: string
  defaultValue?: any
}

interface IDecoratorClassKey extends IDecoratorClassInfo{
}

interface IDecoratorClassArgsFunction extends IDecoratorClassInfo {
  inf: boolean
}

interface IDecoratorClassKeyFunction extends IDecoratorClassKey{
  returnType?: string
  args: IDecoratorClassArgsFunction[]
  totalArgs: number
}

interface IDecoratorClassDetails {
  methods: IDecoratorClassKeyFunction[]
  properties: IDecoratorClassKey[]
}

interface IDecoratorClass<T=any> extends IDecoratorClassKey{
  class: GenericClass<T>
  staticDetail: IDecoratorClassDetails
  instanceDetails?: IDecoratorClassDetails
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
  IClassDecorator as ClassDecorator, IDecoratorClass as DecoratorClass, IDecoratorClassArgsFunction as DecoratorClassArgsFunction, IDecoratorClassDetails as DecoratorClassDetails, IDecoratorClassInfo as DecoratorClassInfo,
  IDecoratorClassKey as DecoratorClassKey, IDecoratorClassKeyFunction as DecoratorClassKeyFunction, IDecoratorPropertyKey as DecoratorPropertyKey, IMethodDecorator as MethodDecorator,
  IParameterDecorator as ParameterDecorator,
  IPropertyDecorator as PropertyDecorator
};
