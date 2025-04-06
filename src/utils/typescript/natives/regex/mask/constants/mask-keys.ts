import { RegexPatterns } from "../../regex-utils";

const maskKeys = {
  '0': RegexPatterns.Digit,
  'A': RegexPatterns.LetterOrDigit,
  'S': RegexPatterns.Letter,
  'U': RegexPatterns.UppercaseLetter,
  'L': RegexPatterns.LowercaseLetter,
  '.': RegexPatterns.Dot,
  ',': RegexPatterns.Comma,
  '@': '@',
  '!': RegexPatterns.SpecialChar,
  'x': RegexPatterns.Any,
  's': RegexPatterns.DecimalSeparator,
  "=>": RegexPatterns.PositiveLookahead,
  "<=": RegexPatterns.PositiveLookbehind,
  "!>": RegexPatterns.NegativeLookahead,
  "<!": RegexPatterns.NegativeLookbehind,
}

export {
  maskKeys
}