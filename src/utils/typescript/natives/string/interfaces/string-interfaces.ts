/** Coloca o primeiro caracter da string recebida em maiúsculo. 
 * 
 * @example
 * type Capitalized = Capitalize<'hello'>; // 'Hello'
 */
type _ICapitalize<S extends string> = Capitalize<S>;

/**
 * Converte um tipo literal de string para maiúsculas.
 * 
 * @example
 * type UppercaseExample = _Uppercase<'hello'>; // 'HELLO'
 */
type _IUppercase<S extends string> = Uppercase<S>;

/**
 * Converte um tipo literal de string para minúsculas.
 * 
 * @example
 * type LowercaseExample = _Lowercase<'HELLO'>; // 'hello'
 */
type _ILowercase<S extends string> = Lowercase<S>;

/**
 * Converte o primeiro caractere de um tipo literal de string para minúsculas.
 * 
 * @example
 * type UncapitalizeExample = _Uncapitalize<'Hello'>; // 'hello'
 */
type _IUncapitalize<S extends string> = Uncapitalize<S>;

type ITostring<T extends string | number | bigint | boolean | null | undefined> = `${T}`

export { 
  _ICapitalize as Capitalize, 
  _IUppercase as Uppercase, 
  _ILowercase as Lowercase, 
  _IUncapitalize as Uncapitalize,
  ITostring as Tostring
}
