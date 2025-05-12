import { lambda } from "@ts-natives/object/object-utils"
import { RegexBasicPatterns } from "../../constants/regex-patterns"
import { MaskUtils } from "../mask-utils"
import { MaskFunction, MaskKey, MaskParameter } from "../model/mask-key"


const any = new MaskKey({
  key: 'X',
  regex: RegexBasicPatterns['AnyCharacters']
})

const anyLetterOrDigit = new MaskKey({
  key: 'A',
  regex: RegexBasicPatterns['AnyLetterOrDigit']
})
const anyLetter = new MaskKey({
  key: 'L',
  regex: RegexBasicPatterns['AnyLetter']
})
const anyUppercaseLetter = new MaskKey({
  key: 'U',
  regex: RegexBasicPatterns['AnyUppercaseLetter']
})
const anyLowercaseLetter = new MaskKey({
  key: 'LL',
  regex: RegexBasicPatterns['AnyLowercaseLetter']
})
const digit = new MaskKey({
  key: 'D',
  regex: RegexBasicPatterns['AnyNumber']
})
const dot = new MaskKey({
  key: '.',
  regex: RegexBasicPatterns['Dot']
})
const comma = new MaskKey({
  key: ',',
  regex: RegexBasicPatterns['Comma']
})
const decimalSeparators = new MaskKey({
  key: 'DS',
  regex: RegexBasicPatterns['DecimalSeparators']
})
const anySpecialCharacters = new MaskKey({
  key: '!',
  regex: RegexBasicPatterns['AnySpecialCharacters']
})
const atSign = new MaskKey({
  key: '@',
  regex: RegexBasicPatterns['AtSign']
})

const number = new MaskKey({
  key: 'N',
  parameters: [
    new MaskParameter({
      parameter: 'integerDigits',
      valueType: 'number',
      defaultValue: null,
      optional: true
    }),
    new MaskParameter({
      parameter: 'fractionDigits',
      valueType: 'number',
      defaultValue: 2,
      optional: true
    })
  ],
  regex: new MaskFunction({
    func: lambda(MaskUtils, 'numberMask'),
    args: [
      'integerDigits',
      'fractionDigits'
    ]
  })
})

const MASK_KEYS: MaskKey[] = [
  any,
  anyLetterOrDigit,
  anyLetter,
  anyUppercaseLetter,
  anyLowercaseLetter,
  digit,
  dot,
  comma,
  decimalSeparators,
  anySpecialCharacters,
  atSign,
  number
]


export {
  MASK_KEYS
}