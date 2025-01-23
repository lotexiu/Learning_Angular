interface LanguageRules {
  reservedKeys: string[];
  scopeKeys: Record<string, string>;
  colors?: {
    reservedKeys: string;
    scopeKeys: string;
    invalid: string;
  };
  indentifiers?: Record<string, IdentifierRule>;
}

interface IdentifierRule {
  identify: string;
  hasScope?: boolean;
}

export {
  LanguageRules,
  IdentifierRule,
}