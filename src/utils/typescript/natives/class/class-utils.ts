import { mathPow, mathRandom } from "@ts-natives/math/math-utils";
import { ClassReflect, MethodReflect } from "../../extras/registry/decorators/decorators";

@ClassReflect('Utility class for handling class-related operations')
class ClassUtils {
  /**
   * Generates a new ID based on the current date and a random number.
   * @returns {string} A new unique ID.
   */
  @MethodReflect(true, {
    description: 'Generates a new ID based on the current date and a random number',
    returnType: 'string',
  })
  static newId(): string {
    const date: string = new Date(mathPow(mathRandom(6.5, 9.99),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length["/"](2)));
  }
}

export {
  ClassUtils
};

const {
  newId,
} = ClassUtils

export {
  newId
};
