interface ScopeMatch {
  scope: string;
  start: number;
  end: number | null;
  children: ScopeMatch[]; // Adicionado para suportar escopos aninhados
}

export {
  ScopeMatch,
}