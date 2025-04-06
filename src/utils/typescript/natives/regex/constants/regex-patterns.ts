import { RegexBasicLookArounds } from "./look-around";
import { Quantifiers } from "./quantifiers";

interface Pattern {
  pattern: string;
  mandatoryFlags?: string[];
}

const {
  NegativeLookahead,
  NegativeLookbehind,
  PositiveLookahead,
  PositiveLookbehind,
} = RegexBasicLookArounds

const {
  ZeroOrMore,
  OneOrMore,
  Optional,
  Or,
} = Quantifiers

const RegexBasicPatterns = {
  /* Specific Characters Regex */
  Dot: {
    pattern: '\\.',
  },
  Comma: {
    pattern: ',',
  },
  AtSign: {
    pattern: '@',
  },
  DecimalSeparetors: {
    pattern: '[.,]',
  },
  /* Basic Regex */
  WhiteSpace: {
    pattern: '\\s',
  },
  Digit: {
    pattern: '\\d',
  },
  Letter: {
    pattern: '[A-Za-z]',
  },
  LetterOrDigit: {
    pattern: '\\w',
  },
  UppercaseLetter: {
    pattern: '[A-Z]',
  },
  LowercaseLetter: {
    pattern: '[a-z]',
  },
  SpecialCharacters: {
    pattern: '[^A-Za-z0-9\\s]',
  },
  AnyCharacter: {
    pattern: '[\\s\\S]',
  },
  MathOperators: {
    pattern: '[-+\/*%**]',
  },
  Word: {
    pattern: '[A-z]+',
  },
  WordWithNumbers: {
    pattern: '[A-z0-9]+',
  },
  Numbers: {
    pattern: `\\d+(${PositiveLookahead}[,.])`,
  },
  Decimal: {
    pattern: `(${PositiveLookbehind}[,.])`+ /* Should have some "," or "." Before the digits */
             `\\d+`+                        /* Digits */
             `(${NegativeLookahead}[,.])`+  /* Shouldn't have some "," or "." After the digits */
             `(${NegativeLookahead}\\d+?)`, /* Prevent to get some digits into wrong position */
  },
  /* Opposite Regex */
  NotLetterOrDigits: {
    pattern: '\\W',
  },
  NotDigits: {
    pattern: '\\D',
  },
  NotWhiteSpace: {
    pattern: '\\S',
  },
  /* Any Regex (Uses Unicode Flag) */
  AnyLetter: {
    pattern: '\p{L}',
    mandatoryFlags: ['u'],
  },
  AnyLetterOrDigit: {
    pattern: '\p{L}\p{N}',
    mandatoryFlags: ['u'],
  },
  AnyUppercaseLetter: {
    pattern: '\p{Lu}',
    mandatoryFlags: ['u'],
  },
  AnyLowercaseLetter: {
    pattern: '\p{Ll}',
    mandatoryFlags: ['u'],
  },
  AnyNumber: {
    pattern: '\p{N}',
    mandatoryFlags: ['u'],
  },
  AnySpecialCharacter: {
    pattern: '\p{P}',
    mandatoryFlags: ['u'],
  },
}

export {
  Pattern,
  RegexBasicPatterns,
}