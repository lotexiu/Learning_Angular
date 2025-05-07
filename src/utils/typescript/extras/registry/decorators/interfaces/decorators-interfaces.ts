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
  IParameterDecorator as ParameterDecorator,
  IPropertyDecorator as PropertyDecorator,
  IMethodDecorator as MethodDecorator,
  IDecoratorPropertyKey as DecoratorPropertyKey,
};
