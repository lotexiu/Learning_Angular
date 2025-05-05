import { GenericClass } from "@ts-natives/object/interfaces/object-interfaces";

class Class extends Object{
  get class(): GenericClass<this> {
    return this.constructor as any;
  }
}

export {
  Class
};
