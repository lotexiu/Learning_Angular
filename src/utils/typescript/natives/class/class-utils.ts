import { mathPow, mathRandom } from "@ts-natives/math/math-utils";

class ClassUtils {
  static newId(): string {
    const date: string = new Date(mathPow(mathRandom(6.5, 9.99),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length["/"](2)));
  }
}

export {
  ClassUtils,
}

const {
  newId,
} = ClassUtils

export {
  newId,
}