const Quantifiers = {
  ZeroOrMore: {
    pattern: '*',
  },
  OneOrMore: {
    pattern: '+',
  },
  Optional: {
    pattern: '?',
  },
  Range: {
    pattern: '{n,m}',
    args: ['n', 'm'],
    function: (n: number, m: number): string => {
      return n === m ? `{${n}}` : `{${n},${m}}`
    }
  },
  AtLeast: {
    pattern: '{n,}',
    args: ['n'],
    function: (n: number): string => {
      return `{${n},}`
    }
  },
  Exactly: {
    pattern: '{n}',
    args: ['n'],
    function: (n: number): string => {
      return `{${n}}`
    }
  },
  Or: {
    pattern: '|',
  }
}

export {
  Quantifiers,
}