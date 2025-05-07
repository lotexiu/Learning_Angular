import { AnyClass } from "@ts-interfaces/misc-interfaces";

class Class extends Object{
  get class(): this {
    return this.constructor as any;
  }
}

export {
  Class
};
