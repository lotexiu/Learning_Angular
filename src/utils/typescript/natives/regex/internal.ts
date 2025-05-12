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

export const _Regex = {
  formatPhone,
  isValidEmail,
  isValidCEP,
  onlyDigits,
  removeCharsExcept,
  inverseSeparator,
  downPath,
};
