import { divide, minus, multiply, sum, pow, remainPercentage } from "src/utils/easy-use"
import { INumberHandler, IOperators } from "./interfaces/number-interfaces"

class PNumber {

  public handlers: INumberHandler[] = []

  constructor(public value: number) {}

  static new(v: number): PNumber{
    return new PNumber(v)
  }

  private operatorHandle(op: IOperators, values: (number|PNumber)[]): PNumber {
    const nValues: number[] = values.map(
      (v: number|PNumber): number => v instanceof PNumber ? v.value : v
    )
    switch (op) {
      case "+":
        this.value = sum(this.value, ...nValues)
        break
      case "-":
        this.value = minus(this.value, ...nValues)
        break
      case "/":
        this.value = divide(this.value, ...nValues)
        break
      case "//":
        this.value = remainPercentage(this.value, nValues[0])
        break
      case "*":
        this.value = multiply(this.value, ...nValues)
        break
      case "**":
        this.value = pow(this.value, ...nValues)
        break
      case '%':
        this.value = this.value % nValues[0]
        break
    }
    this.handlers.forEach((h: INumberHandler): void => h(this, op))
    return this
  }


  '+'(...values: number[]): PNumber {
    return this.plus(...values)
  }
  plus(...values: number[]): PNumber {
    return this.operatorHandle("+", values)
  }

  '-'(...values: number[]): PNumber {
    return this.minus(...values)
  }
  minus(...values: number[]): PNumber {
    return this.operatorHandle("-", values)
  }

  '*'(...values: number[]): PNumber {
    return this.multiply(...values)
  }
  multiply(...values: number[]): PNumber {
    return this.operatorHandle("*", values)
  }

  '/'(...values: number[]): PNumber {
    return this.divide(...values)
  }
  divide(...values: number[]): PNumber {
    return this.operatorHandle("/", values)
  }

  '//'(value: number): PNumber {
    return this.operatorHandle("//", [value])
  }
  remainPercentage(value: number): PNumber {
    return this.operatorHandle("//", [value])
  }

  '**'(...values: number[]): PNumber {
    return this.pow(...values)
  }
  pow(...values: number[]): PNumber {
    return this.operatorHandle("**", values)
  }

  '%'(value: number): PNumber {
    return this.rest(value)
  }
  rest(value: number): PNumber {
    return this.operatorHandle('%', [value])
  }

}

export {
  PNumber
}