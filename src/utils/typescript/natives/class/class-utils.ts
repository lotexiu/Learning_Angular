import { mathRandom } from "@ts-natives/math/math-utils";

class ClassUtils {
  /* TODO - mover a função para outro lugar. Não pertence a está classe */
  static newId(): string {
    const date: string = new Date(Math.pow(mathRandom(7,9.99999),13)).getTime().toString();
    return date.slice(date.length - Math.floor(date.length/2));
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