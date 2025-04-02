import { PNumber } from "../number";

type IOperators = '+'|'-'|'/'|'//'|'*'|'**'|'%'

type INumberHandler = (value: PNumber, operator: IOperators) => void

export {
  IOperators,
  INumberHandler,
}