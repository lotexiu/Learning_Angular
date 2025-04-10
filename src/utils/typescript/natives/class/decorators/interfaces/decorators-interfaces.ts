// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => void;

import { Nullable } from "@ts-interfaces/misc-interfaces";
import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";


interface IDecoratorInfo {
  name: string|number|symbol
  type: string
  description: string
  defaultValue?: any
}

interface IDecoratorClassKey extends IDecoratorInfo{
}

interface IDecoratorArgsFunction extends IDecoratorInfo {
  inf: boolean
}

interface IDecoratorClassKeyFunction extends IDecoratorClassKey{
  returnType?: string
  args: IDecoratorArgsFunction[]
  totalArgs: number
}

interface IDecoratorClassDetails {
  methods: IDecoratorClassKeyFunction[]
  properties: IDecoratorClassKey[]
}

interface IDecoratorClassInfo<T=any> extends IDecoratorClassKey{
  class: GenericClass<T>
  staticDetail: any// IDecoratorClassDetails
  instanceDetails?: any// IDecoratorClassKeyFunction
}

type IClassDecorator<T> = (target: Function) => T|void;

export {
  IClassDecorator as ClassDecorator,
  IDecoratorInfo as DecoratorInfo,
  IDecoratorClassKey as DecoratorClassKey,
  IDecoratorArgsFunction as DecoratorArgsFunction,
  IDecoratorClassKeyFunction as DecoratorClassKeyFunction,
  IDecoratorClassDetails as DecoratorClassDetails,
  IDecoratorClassInfo as DecoratorClassInfo,

}