function formatPhone(phone: string) {
  let phoneOnlyDigits = onlyDigits(phone).slice(0, 13);
  let phoneSize = phoneOnlyDigits.length;
  function dynamicPhoneMask() {
    let maskPart = phoneSize > 4 ? "-" : "";
    return (
      `${phoneOnlyDigits.slice(0, 4)}${maskPart}${phoneOnlyDigits.slice(4, 8)}`
    );
  }
  return (
    phoneSize < 9 ? dynamicPhoneMask() :
    phoneSize == 9 ? phoneOnlyDigits.replace(/(\d{5})(\d{4})$/, '$1-$2') :
    phoneSize == 10 ? phoneOnlyDigits.replace(/(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3') :
    phoneSize == 11 ? phoneOnlyDigits.replace(/(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3') :
    phoneSize == 12 ? phoneOnlyDigits.replace(/(\d{2})(\d{2})(\d{4})(\d{4})$/, '+$1 ($2) $3-$4') :
    phoneOnlyDigits.replace(/(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')
  );
}

function isValidEmail(email: string): boolean {
  const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
  return emailRegex.test(email);
}

function isValidCEP(cep: string): boolean {
  return /^\d{8}$/.test(cep.replace(/[^\d]+/g, ""));
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function removeCharsExcept(text: string, allowedChars: string): string {
  if (!text || !allowedChars) return '';
  const escapedChars: string = allowedChars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const pattern = new RegExp(`[^${escapedChars}]`, 'g');
  return text.replace(pattern, '');
}

function inverseSeparator(separator: string): string {
  return separator == '.' ? ',' : '.';
}

function downPath(path: string, levels: number = 1): string {
  const parts = path.split('/');
  return parts.slice(0, -levels).join('/');
}

/**
 * Finds all indexes in the input string that most closely match the given pattern using regex.
 * Returns the start indexes of all matches found.
 * @param input - The string to search in.
 * @param pattern - The regex pattern to search for (as string or RegExp).
 * @param flags - Optional regex flags (e.g., 'gi').
 * @returns Array of start indexes for each match found.
 * @example
 * // returns [0, 5]
 * findPatternIndexes('abcdeabc', 'abc')
 * @example
 * // returns [2]
 * findPatternIndexes('xxAbcxx', /abc/i)
 * @example
 * // returns [1, 4]
 * findPatternIndexes('a1a2a', /a\d/)
 */
function findPatternIndexes(input: string, pattern: string | RegExp, flags?: string): number[] {
  let regex: RegExp;
  if (pattern instanceof RegExp) {
    regex = new RegExp(pattern.source, flags || pattern.flags);
  } else {
    regex = new RegExp(pattern, flags);
  }
  const indexes: number[] = [];
  let match: RegExpExecArray | null;
  // Always use global flag to find all matches
  const globalRegex = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
  while ((match = globalRegex.exec(input)) !== null) {
    indexes.push(match.index);
    // Avoid infinite loop for zero-width matches
    if (match.index === globalRegex.lastIndex) {
      globalRegex.lastIndex++;
    }
  }
  return indexes;
}

export const _Regex = {
  formatPhone,
  isValidEmail,
  isValidCEP,
  onlyDigits,
  removeCharsExcept,
  inverseSeparator,
  downPath,
  findPatternIndexes,
};
