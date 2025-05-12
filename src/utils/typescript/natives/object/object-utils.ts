import { Function } from "@ts-natives/functions/interfaces/function-interfaces";
import { AnyClass, AnyValue, Nullable } from "@ts-interfaces/misc-interfaces";
import { ConcatStrIntoKeys, CustomReturn, KeysOfType, Object, RemoveCicularReferences } from "./interfaces/object-interfaces";
import { _Object } from "./internal";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";

/**
 * Utility class for object operations. All methods delegate to the internal _Object helpers.
 */
class ObjectUtils {
  /**
   * Removes circular references from an object for safe JSON serialization.
   * @returns A replacer function for JSON.stringify.
   * @example
   * JSON.stringify(obj, ObjectUtils.removeCircularReferences())
   */
  static removeCircularReferences(): RemoveCicularReferences {
    return _Object.removeCircularReferences();
  }

  /**
   * Checks if a value is null, undefined, or matches custom null values.
   * @param value - The value to check.
   * @param customNullValues - Additional values to consider as null.
   * @returns True if the value is considered null.
   * @example
   * ObjectUtils.isNull(null) // true
   * ObjectUtils.isNull('', '') // true
   */
  static isNull<T>(value: Nullable<T>, ...customNullValues: any[]): value is Nullable<null> {
    return _Object.isNull(value, ...customNullValues);
  }

  /**
   * Checks if a value is null or undefined.
   * @param value - The value to check.
   * @returns True if the value is null or undefined.
   * @example
   * ObjectUtils.isNullOrUndefined(undefined) // true
   */
  static isNullOrUndefined<T>(value: Nullable<T>): value is Nullable<null> {
    return _Object.isNullOrUndefined(value);
  }

  /**
   * Compares two values for equality, considering custom null values.
   * @param a - First value.
   * @param b - Second value.
   * @param customNullValues - Additional values to consider as null.
   * @returns True if values are equal.
   * @example
   * ObjectUtils.equals(1, 1) // true
   */
  static equals(a: any, b: any, ...customNullValues: any[]): boolean {
    return _Object.equals(a, b, ...customNullValues);
  }

  /**
   * Creates a shallow copy of an object or class instance.
   * @param value - The value to copy.
   * @returns A new object with the same properties.
   * @example
   * ObjectUtils.makeObjectBasedOn({a:1}) // {a:1}
   */
  static makeObjectBasedOn<T extends (AnyClass|AnyValue)>(value: T): T {
    return _Object.makeObjectBasedOn(value);
  }

  /**
   * Adds a prefix to all keys of an object.
   * @param value - The object.
   * @param prefix - The prefix string.
   * @returns A new object with prefixed keys.
   * @example
   * ObjectUtils.addPrefixToKeys({a:1}, 'pre') // {preA:1}
   */
  static addPrefixToKeys<T extends Object, Prefix extends string>(value: T, prefix: Prefix): ConcatStrIntoKeys<T, Prefix> {
    return _Object.addPrefixToKeys(value, prefix);
  }

  /**
   * Copies a value, optionally adding a prefix to its keys.
   * @param value - The value to copy.
   * @param prefixOnKeys - Optional prefix for keys.
   * @returns The copied value, with keys prefixed if specified.
   * @example
   * ObjectUtils.copyValue({a:1}, 'pre') // {preA:1}
   */
  static copyValue<T extends (AnyClass|AnyValue), Prefix extends Nullable<string, true> = null >(
    value:T, 
    prefixOnKeys?: Prefix,
  ): CustomReturn<Prefix,[
    [string, ConcatStrIntoKeys<T, Prefix>],
    [null|undefined, T]
  ]> {
    return _Object.copyValue(value, prefixOnKeys);
  }

  /**
   * Serializes an object to JSON, removing circular references.
   * @param obj - The object to serialize.
   * @returns The JSON string.
   * @example
   * ObjectUtils.json({a:1}) // '{"a":1}'
   */
  static json(obj: any): string {
    return _Object.json(obj);
  }

  /**
   * Gets a value from an object using a dot-separated path.
   * @param obj - The object.
   * @param path - The path string.
   * @returns The value at the specified path.
   * @example
   * ObjectUtils.getValueFromPath({a:{b:2}}, 'a.b') // 2
   */
  static getValueFromPath(obj: any, path: string): any {
    return _Object.getValueFromPath(obj, path);
  }

  /**
   * Sets a value in an object using a dot-separated path.
   * @param obj - The object.
   * @param path - The path string.
   * @param value - The value to set.
   * @example
   * ObjectUtils.setValueFromPath(obj, 'a.b', 2)
   */
  static setValueFromPath(obj: any, path: string, value: any): void {
    return _Object.setValueFromPath(obj, path, value);
  }

  /**
   * Removes all fields with null values from an object.
   * @param obj - The object.
   * @returns A new object without null fields.
   * @example
   * ObjectUtils.removeNullFields({a:null, b:1}) // {b:1}
   */
  static removeNullFields<T extends object>(obj: T): Partial<T> {
    return _Object.removeNullFields(obj);
  }

  /**
   * Creates a lambda function that calls a method by name on an object.
   * @param value - The object.
   * @param functionName - The method name.
   * @returns A lambda function.
   * @example
   * ObjectUtils.λ(obj, 'toString')()
   */
  static λ<T extends Object, R>(
    value: T, 
    functionName: KeysOfType<T, Function>
  ): R {
    return _Object.λ(value, functionName);
  }

  /**
   * Alias for λ. Creates a lambda function that calls a method by name on an object.
   * @param value - The object.
   * @param functionName - The method name.
   * @returns A lambda function.
   * @example
   * ObjectUtils.lambda(obj, 'toString')()
   */
  static lambda<T extends Object, R>(
    value: T, 
    functionName: KeysOfType<T, Function>
  ): R {
    return _Object.lambda(value, functionName);
  }

  /**
   * Checks if a value is a class declaration.
   * @param obj - The value to check.
   * @returns True if the value is a class declaration.
   * @example
   * ObjectUtils.isAClassDeclaration(class X {}) // true
   */
  static isAClassDeclaration<T>(obj: any): obj is AnyClass<T> & T {
    return _Object.isAClassDeclaration(obj);
  }
}

export {
  ObjectUtils,
}

const {
  equals,
  isNull,
  isNullOrUndefined,
  removeNullFields,
  removeCircularReferences,
  makeObjectBasedOn,
  addPrefixToKeys,
  copyValue,
  json,
  getValueFromPath,
  setValueFromPath,
  λ,
  lambda,
  isAClassDeclaration,
} = ObjectUtils;

export {
  equals,
  isNull,
  isNullOrUndefined,
  removeNullFields,
  removeCircularReferences,
  makeObjectBasedOn,
  addPrefixToKeys,
  copyValue as copy,
  json,
  getValueFromPath,
  setValueFromPath,
  λ,
  lambda,
  isAClassDeclaration,
}

RegistryUtils.getOrAddRegistryClass(ObjectUtils);