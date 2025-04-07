import { Never } from "src/utils/typescript/interfaces/misc-interfaces";

type IListCompare = [-1, 0, 1]

type ITypeCompare = boolean|null;

type ICompareResult<T extends ITypeCompare = Never> = 
  T extends true ? 1 :
  T extends false ? 0 :
  -1

type ICompare = IListCompare[number]

type IObjCompare<T extends any[] = IListCompare> = {
  value: T[number],
  label: string
}

type IBy10Type = 'multiply'|'divide'

export {
  IListCompare as ListCompare,
  ICompare as Compare,
  IObjCompare as ObjCompare,
  ICompareResult as CompareResult,
  IBy10Type as By10Type,
}