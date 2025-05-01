import { As } from "@ts-extras/generic-utils";
import { RegistryClass } from "@ts-extras/registry/classes/registry-classes";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";
import { BetterClassAssign, EntriesReturn, GenericClass } from "@ts-natives/object/interfaces/object-interfaces";

class Class extends Object{
  get class(): GenericClass<this> {
    return this.constructor as any;
  }

  assign(...values: Partial<BetterClassAssign<this>>[]): this {
    values.forEach((value: Partial<BetterClassAssign<this>>): void => {
      (Object.entries(value) as EntriesReturn<this>[])
      .forEach(([key, val]: EntriesReturn<this>): void => {
        this[key] = val;
      })
    })
    return this
  }


}

export {
  Class
};
