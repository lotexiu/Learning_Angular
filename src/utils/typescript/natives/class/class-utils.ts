import { ReturnType } from "../../interfaces/function-interfaces";
import { random } from "../math/math-utils";
import { Constructor, GetTypeFromKey, KeyOf, KeysOfType } from "../object/interfaces/object-interfaces";
import { copy } from "../object/object-utils";

class ClassUtils {
  static newId(): string {
    const date: string = new Date(Math.pow(random(7,9.99999),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length/2));
  }
}

export {
  ClassUtils,
}

const {
  newId,
} = copy(ClassUtils)

export {
  newId,
}