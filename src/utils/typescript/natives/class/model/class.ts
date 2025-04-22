import { BetterClassAssign, EntriesReturn } from "@ts-natives/object/interfaces/object-interfaces";

class Class {
  get own(): this {
    return this as any;
  }

  assign(...values: Partial<BetterClassAssign<this>>[]): this {
    values.forEach((value: Partial<BetterClassAssign<this>>): void => {
      (Object.entries(value) as EntriesReturn<this>[])
      .forEach(([key, val]: EntriesReturn<this>): void => {
        this.own[key] = val;
      })
    })
    return this
  }


}

export {
  Class
};
