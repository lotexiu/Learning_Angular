import { Class, ComponentUtils } from "./components/component-utils";
import { HTMLUtils } from "./html/html-utils";
import { MathUtils } from "./math/math-utils";
import { RegexUtils } from "./regex/regex-utils";
import { ClipboardUtils } from "./unkown/clipboard-utils";
import { ConsoleUtils } from "./unkown/console-utils";
import { GenericUtils } from "./unkown/generic-utils";
import { ObjectUtils } from "./unkown/object-utils";
import { StringUtils } from "./unkown/string-utils";

// Object Utilities
const {
  equals,
  isNull,
  isNullOrUndefined,
  concatStrIntoFunctions,
  json,
  deepCopy,
  getValueFromPath,
  setValueFromPath,
  removeNullFields,
} = ObjectUtils;

// Generic Utilities
const { 
  gAsyncSleep, 
  gSleep,
} = concatStrIntoFunctions(GenericUtils, 'g');;

// Clipboard Utilities
const {
  clipAddEventListener,
  clipDispatchEvent,
  clipRead,
  clipReadText,
  clipRemoveEventListener,
  clipWrite,
  clipWriteText,
} = concatStrIntoFunctions(ClipboardUtils, 'clip');

// Console Utilities
const { 
  cLog
} = concatStrIntoFunctions(ConsoleUtils, 'c');

// HTML Utilities
const { focusUntilSuccess } = HTMLUtils;

// String Utilities
const {
  strIsValidCNPJ,
  strIsValidCPF,
  strCapitalize,
  strCapitalizeAll,
  strRightPad,
  strLeftPad,
  strGetAddedCharacters,
  strGetRemovedCharacters,
  strRemoveNearestPatternFromIndex,
  strCountMissingCharsBeforeIndex,
  strGetFirstDifferentIndex,
  strGetLastDifferentIndex,
  strRemoveCharacters,
  strNoAccent,
} = concatStrIntoFunctions(StringUtils, 'str');

const {
  regIsValidEmail,
  regFormatPhone,
  regOnlyDigits,
  regRemoveCharsExcept,
  regFormatNumber,
  regDownPath,
} = concatStrIntoFunctions(RegexUtils, 'reg');

// Component Utilities
const { 
  ngValueAcessor, 
  lambda, 
  λ, 
  createDebounce 
} = ComponentUtils;

// Math Utilities
const { 
  random,
  getDecimals,
  hasDecimals,
  getAvarage, 
  betweenMinMax, 
  minMax, 
  multiply, 
  divide, 
  minus, 
  sum,
  mod, 
  pow,
  by10,
  interpolate,
} = MathUtils;

// Exporting Utilities
export {
  /* Console */
  cLog,

  // Generic
  gAsyncSleep,
  gSleep,

  // Object
  equals,
  isNull,
  isNullOrUndefined,
  concatStrIntoFunctions,
  json,
  deepCopy,
  getValueFromPath,
  setValueFromPath,
  removeNullFields,

  // String
  strIsValidCNPJ,
  strIsValidCPF,
  strCapitalize,
  strCapitalizeAll,
  strRightPad,
  strLeftPad,
  strGetAddedCharacters,
  strGetRemovedCharacters,
  strRemoveNearestPatternFromIndex,
  strCountMissingCharsBeforeIndex,
  strGetFirstDifferentIndex,
  strGetLastDifferentIndex,
  strRemoveCharacters,
  strNoAccent,

  // Regex
  regIsValidEmail,
  regFormatPhone,
  regOnlyDigits,
  regRemoveCharsExcept,
  regFormatNumber,
  regDownPath,

  // Math
  random,
  getDecimals,
  hasDecimals,
  getAvarage, 
  betweenMinMax, 
  minMax, 
  multiply, 
  divide, 
  minus, 
  sum,
  mod, 
  pow,
  by10,
  interpolate,

  // Component
  ngValueAcessor,
  lambda,
  λ,
  createDebounce,

  // Clipboard
  clipAddEventListener,
  clipDispatchEvent,
  clipRead,
  clipReadText,
  clipRemoveEventListener,
  clipWrite,
  clipWriteText,

  // HTML
  focusUntilSuccess,
};
