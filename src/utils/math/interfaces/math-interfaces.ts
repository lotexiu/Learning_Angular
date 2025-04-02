import { Never } from "src/utils/interfaces/misc-interfaces";

type ListCompare = [-1, 0, 1]

type TypeCompare = boolean|null;

type CompareResult<T extends TypeCompare = Never> = 
  T extends true ? 1 :
  T extends false ? 0 :
  -1

type Compare = ListCompare[number]

type ObjCompare<T extends any[] = ListCompare> = {
  value: T[number],
  label: string
}

export {
  ListCompare,
  Compare,
  ObjCompare,
  CompareResult,
}