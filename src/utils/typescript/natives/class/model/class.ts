import { BetterAssign, EntriesReturn } from "@ts-natives/object/interfaces/object-interfaces";

class Class<T extends Object> {
  get own(): T {
    return this as any;
  }

  protected assign(value: Partial<BetterAssign<T>>) {
    (Object.entries(value) as EntriesReturn<T>[])
    .forEach(([key, val]: EntriesReturn<T>): void => {
      /* Ainda a ser feito */
    })
  }

  constructor(init?: Partial<BetterAssign<T>>) {
    if (init) {
      const ctor = this.constructor as { new(): T };
      const instance = new ctor();
      Object.assign(instance, init);
      Object.assign(this, instance);
    }
  }
}

export {
  Class
};
