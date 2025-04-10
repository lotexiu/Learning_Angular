import { BetterClassAssign, EntriesReturn } from "@ts-natives/object/interfaces/object-interfaces";

class Class<T extends Object> {
  get own(): T {
    return this as any;
  }

  assign(value: Partial<BetterClassAssign<T>>): this {
    (Object.entries(value) as EntriesReturn<T>[])
    .forEach(([key, val]: EntriesReturn<T>): void => {
      this.own[key] = val;
    })
    return this
  }
}

export {
  Class
};
