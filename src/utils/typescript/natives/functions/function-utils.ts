import { _Function } from "./internal";
import { RegistryUtils } from "@ts-extras/registry/registry-utils";

/**
 * Utility class for function operations. All methods delegate to the internal _Function helpers.
 */
class FunctionUtils {
  /**
   * Returns details about a function, such as name, argument count, argument names, and return type (unknown).
   * @param func - The function to analyze.
   * @returns An object with function details.
   * @example
   * FunctionUtils.functionsDetails(function(a, b) { return a + b; })
   */
  static functionsDetails(func: Function) {
    return _Function.functionsDetails(func);
  }

  /**
   * Returns the argument names of a function as an array of strings.
   * @param func - The function to analyze.
   * @returns Array of argument names.
   * @example
   * FunctionUtils.getArgs(function(a, b) { return a + b; }) // ["a", "b"]
   */
  static getArgs(func: Function): string[] {
    return _Function.getArgs(func);
  }
}

RegistryUtils.getOrAddRegistryClass(FunctionUtils);

export {
  FunctionUtils
}