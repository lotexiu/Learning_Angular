/** Coloca o primeiro caracter da string recebida em maiúsculo. 
 * 
 * @example
 * type Capitalized = Capitalize<'hello'>; // 'Hello'
 */
type _Capitalize<S extends string> = Capitalize<S>;

/**
 * Converte um tipo literal de string para maiúsculas.
 * 
 * @example
 * type UppercaseExample = _Uppercase<'hello'>; // 'HELLO'
 */
type _Uppercase<S extends string> = Uppercase<S>;

/**
 * Converte um tipo literal de string para minúsculas.
 * 
 * @example
 * type LowercaseExample = _Lowercase<'HELLO'>; // 'hello'
 */
type _Lowercase<S extends string> = Lowercase<S>;

/**
 * Converte o primeiro caractere de um tipo literal de string para minúsculas.
 * 
 * @example
 * type UncapitalizeExample = _Uncapitalize<'Hello'>; // 'hello'
 */
type _Uncapitalize<S extends string> = Uncapitalize<S>;

export { 
  _Capitalize as Capitalize, 
  _Uppercase as Uppercase, 
  _Lowercase as Lowercase, 
  _Uncapitalize as Uncapitalize 
}
