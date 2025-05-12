interface RegexPattern {
  pattern: string;
  mandatoryFlags?: string[];
}

type ObjRegexPattern<T=any> = {
  [key in keyof T]: RegexPattern
}

export {
  RegexPattern,
  ObjRegexPattern
}