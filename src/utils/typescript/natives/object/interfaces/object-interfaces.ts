import { Function, NativeFunction } from "@ts-natives/functions/interfaces/function-interfaces";
import { Extends } from "@ts-interfaces/misc-interfaces";
import { KeyOf, Pick } from "./native-object-interfaces";
import { Pair } from "@ts-natives/array/interfaces/array-interfaces";
import { ObjectUtils } from "../object-utils";

type ICommonFields<T, U> = Pick<T, Extract<keyof T, keyof U>>;

type IPrimitiveObject = {
  [key: string|number]: any;
  [key: symbol]: symbol;
} & Object

type _Object = Object & {[key: string|number]: any;} 
  & INegate<[]>;

type _StringKeys<T> = Extract<keyof T, string>;
type INegate<T> = {
  [K in _StringKeys<T>]: {
    [P in _StringKeys<T>]?: P extends K ? never : any//|T[P]
  }
}[_StringKeys<T>];

type IObject<T=_Object> =
  T extends Function ? never :
  T extends Array<any> ? never :
  T extends object ? T :
  never;

/**
 * Usado para limitar os campos que podem ser criados em um objeto e seus tipos.
 * 
 * @example
 * type Fields = "field1"|"field2"
 * 
 * const myObj: LockedParams<Fields, string> = {
 *  field1: "alguma coisa",
 *  field2: "outra coisa"
 *  field3: "mais um" // Gera erro pois não existe o campo
 *  field2: 2 // Gera erro pois o tipo não é string
 * }
 */
type ILockedParams<
  fieldType,  
  valueType = any                    
> = Partial<Record<Extends<fieldType, string>, valueType>>

/**
 * @example
 * type CReturn<T> = ICustomReturn<T, [
 *   ["X",string],
 *   ["Y"|"K",number]
 * ]> // number
 * CReturn<"X"|"Y"> // string | number
 * CReturn<"Y"> // number
 * CReturn<"K"> // number
 * CReturn<"X"> // string
 * CReturn<"Z"> // never
 */
type ICustomReturn <
Type, 
Returns extends Pair<any, any>[]
> = {
  [Return in KeyOf<Returns>]: 
    Type extends Returns[Return][0] ?
      Returns[Return][1] :
      never
}[number]

/**
 * @template Target - Recebe uma interface de um objeto ou classe
 * @template TValue - Tipo dos campos a serem procurados em TTarget
 * 
 * Pode ser usado para:
 * - Tipar o retorno de uma função
 * - Tipar a atribuição de uma variavel
 * - Criar um tipo.
 * 
 * @example
 * interface Example {
 *   id: number;
 *   name: string;
 *   isActive: boolean;
 * }
 * 
 * type StringKeys = KeysOfType<Example, string>; // "name"
 */
type IKeysOfType<
  Target, 
  Type
> = {
  [Key in KeyOf<Target>]: Target[Key] extends Type ? Key : never
}[KeyOf<Target>]

type IHasExactKey <
  Target, 
  Key extends KeyOf<Target>,
  Type extends Target[Key]
> = Target[Key] extends Type ? Key : never

/** Concatena o prefixo e capitaliza a primeira letra dos métodos 
 * 
 * @example
 * interface Methods {
 *   getName(): string;
 *   getAge(): number;
 * }
 * 
 * type PrefixedMethods = ConcatStrIntoKeys<Methods, 'prefix'>;
 * // {
 * //   prefixGetName(): string;
 * //   prefixGetAge(): number;
 * // }
 */
type IConcatStrIntoKeys<Base, Prefix extends string|null|undefined> = {
  [Key in KeyOf<Base> as 
    Key extends string ? `${Prefix}${Capitalize<Key>}`
    : never
  ]: Base[Key];
};

/**
 * Extrai o tipo de uma chave específica de um objeto ou classe.
 * 
 * @template T - O tipo do objeto ou classe
 * @template K - A chave cujo tipo será extraído
 * 
 * @example
 * interface Example {
 *   id: number;
 * }
 * 
 * type IdType = getTypeFromKey<Example, 'id'>; // number
 */
type IGetTypeFromKey<T, K extends KeyOf<T>> = T[K];

type IEntriesReturn<T> =  [KeyOf<T>, IGetTypeFromKey<T, KeyOf<T>>];

type IRemoveCicularReferences = Function<[string, any], any, false, any> ;

type IDeepPartial<T> =
  T extends (...args: any[]) => any ? any :
  T extends Array<infer U> ? Array<IDeepPartial<U>> :
  T extends object ? {
    [K in keyof T]?: IDeepPartial<T[K]>|T[K]
  } :
  T;

export {
  ICommonFields as CommonFields,
  IRemoveCicularReferences as RemoveCicularReferences,
  IPrimitiveObject as PrimitiveObject,
  IObject as Object,
  IEntriesReturn as EntriesReturn,
  IGetTypeFromKey as GetTypeFromKey,
  IConcatStrIntoKeys as ConcatStrIntoKeys,
  IKeysOfType as KeysOfType,
  ICustomReturn as CustomReturn,
  ILockedParams as LockedParams,
  IDeepPartial as DeepPartial,
};

