import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { DecoratorClassInfo } from "../decorators/interfaces/decorators-interfaces";

interface IClassRegistry {
  [className: GenericClass<any>['name'] ]: DecoratorClassInfo
}

export {
  IClassRegistry as ClassRegistry,
}