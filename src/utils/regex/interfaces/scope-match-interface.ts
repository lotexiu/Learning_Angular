interface ScopeMatch {
  scope: string;
  start: number;
  end: number;
  children: ScopeMatch[]; // Adicionado para suportar escopos aninhados
}

export {
  ScopeMatch,
}