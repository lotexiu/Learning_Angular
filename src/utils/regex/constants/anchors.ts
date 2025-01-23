const Anchors = {
  StartOfString: {
    pattern: '^',
  },
  EndOfString: {
    pattern: '$',
  },
  WordBoundary: {
    pattern: '\\b',
  },
  NonWordBoundary: {
    pattern: '\\B',
  },
}

export {
  Anchors,
}