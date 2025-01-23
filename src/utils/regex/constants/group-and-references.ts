const GroupsAndReferences = {
  /**
   * Create a group for a pattern and capture the match.
   */
  Group: (pattern: string): string => `(${pattern})`,
  /**
   * Create a named group for a pattern and capture the match.
   */
  NamedGroup: (name: string, pattern: string): string => `(?<${name}>${pattern})`,
  /**
   * Create a group for a pattern but don't capture the match.
   */
  NonCapturingGroup: (pattern: string): string => `(?:${pattern})`,
  /**
   * Reference a group by groupNumber.
   */
  GroupReference: (groupNumber: number): string => `\\${groupNumber}`,
}

export {
  GroupsAndReferences,
}