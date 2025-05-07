import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";
import { RegistryClass } from "@ts-extras/registry/model/registry-classes";

interface IClassRegistry {
  [className: GenericClass<any>['name'] ]: RegistryClass<any>
}

export {
  IClassRegistry as ClassRegistry,
}