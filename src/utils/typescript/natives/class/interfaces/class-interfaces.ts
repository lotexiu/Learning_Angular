import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { DecoratorClass } from "../../../extras/registry/decorators/interfaces/decorators-interfaces";

interface IClassRegistry {
  [className: GenericClass<any>['name'] ]: DecoratorClass
}

export {
  IClassRegistry as ClassRegistry,
}