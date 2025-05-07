import { AnyClass } from "@ts-interfaces/misc-interfaces";
import { RegistryClass } from "../model/registry-classes";

interface IClassRegistry {
  [className: AnyClass['name'] ]: RegistryClass<any>
}

export {
  IClassRegistry as ClassRegistry,
}