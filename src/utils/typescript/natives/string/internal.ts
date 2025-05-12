import { _Regex } from "@ts-natives/regex/internal";

function onlyDigits(value: string): string {
  return _Regex.onlyDigits(value);
}

function formatPhone(phone: string) {
  return _Regex.formatPhone(phone);
}

function isValidEmail(email: string): boolean {
  return _Regex.isValidEmail(email);
}

function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[\s.-]*/g, '');
  if (!cpf || cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
    return false;
  }
  const calculateDigit = (slice: string): number => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += parseInt(slice[i]) * (slice.length + 1 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    return remainder;
  };
  const firstDigit = calculateDigit(cpf.slice(0, 9));
  const secondDigit = calculateDigit(cpf.slice(0, 10));
  return (
    firstDigit === parseInt(cpf[9]) &&
    secondDigit === parseInt(cpf[10])
  );
}

function isValidCNPJ(cnpj: string): boolean {
  const weights: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const digits: string = _Regex.onlyDigits(cnpj);
  let n = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(digits[i], 10);
    const weight = weights[i + 1];
    n += digit * weight;
  }
  const firstDigit = (((n %= 11) < 2) ? 0 : 11 - n);
  if (parseInt(digits[12], 10) !== firstDigit) {
    return false;
  }
  n = 0;
  for (let i = 0; i <= 12; i++) {
    const digit = parseInt(digits[i], 10);
    const weight = weights[i];
    n += digit * weight;
  }
  const secondDigit = (((n %= 11) < 2) ? 0 : 11 - n);
  if (parseInt(digits[13], 10) !== secondDigit) {
    return false;
  }
  return true;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeAll(str: string, splitStr: string): string {
  return str.split(splitStr).map((strPart: string): string => capitalize(strPart)).join(splitStr);
}

function rightPad(str: string, padChar: string, length: number): string {
  return str + padChar.repeat(length - str.length);
}

function leftPad(str: string, padChar: string, length: number): string {
  return padChar.repeat(length - str.length) + str;
}

function removeNearestPatternFromIndex(value: string, pattern: string, index: number): string {
  if (!value) {
    throw new Error("value must not be empty");
  }
  if (!pattern) {
    return value;
  }
  let closestIndex = -1;
  let minDistance = Infinity;
  for (let i = 0; i <= value.length - pattern.length; i++) {
    const substring = value.slice(i, i + pattern.length);
    if (substring === pattern) {
      const distance = Math.abs(i - index);
      if (distance < minDistance) {
        closestIndex = i;
        minDistance = distance;
      }
    }
  }
  if (closestIndex === -1) {
    return value;
  }
  return value.slice(0, closestIndex) + value.slice(closestIndex + pattern.length);
}

function getAddedCharacters(original: string, updated: string): string {
  const originalChars = [...original];
  let addedCharacters: string = '';
  [...updated].forEach((char: string): void => {
    const index = originalChars.indexOf(char);
    if (index !== -1) {
      originalChars.splice(index, 1);
    } else {
      addedCharacters += char;
    }
  });
  return addedCharacters;
}

function getRemovedCharacters(original: string, updated: string): string {
  const updatedChars = [...updated];
  let removedCharacters: string = '';
  [...original].forEach((char: string): void => {
    const index = updatedChars.indexOf(char);
    if (index !== -1) {
      updatedChars.splice(index, 1);
    } else {
      removedCharacters += char;
    }
  });
  return removedCharacters;
}

function countMissingCharsBeforeIndex(oldStr: string, newStr: string, index: number): number {
  return getRemovedCharacters(oldStr.slice(0, index), newStr).length;
}

function getFirstDifferentIndex(str1: string, str2: string, defaultValue: number = -1): number {
  let index: number = [...str1].findIndex((char, index) => {
    return str2[index] !== char;
  });
  return index === -1 ? defaultValue : index;
}

function getLastDifferentIndex(str1: string, str2: string, defaultValue: number = -1): number {
  return getFirstDifferentIndex([...str1].reverse().join(''), [...str2].reverse().join(''), defaultValue);
}

function removeCharacters(baseString: string, charsToRemove: string): string {
  return baseString
    .split('')
    .filter(char => !charsToRemove.includes(char))
    .join('');
}

function noAccent(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function splitBalancedGroups(text: string, group: string) {
  let parts: any[] = [];
  let opens: number = 0;
  let closes: number = 0;
  [...text].forEach((char: string, idx: number) => {
    if (opens === closes && opens > 0 && char === group[0]) {
      parts.push(text.slice(0, idx));
      text = text.slice(idx);
      opens = 0; closes = 0;
    }
    switch (char) {
      case group[0]:
        opens++;
        break;
      case group[1]:
        closes++;
        break;
    }
  });
  if (opens === closes && opens > 0) {
    parts.push(text);
  }
  return parts;
}

function stringToCharCodeArray(str: string): string[] {
  return str.split('').map((char: string): string => {
    return char.charCodeAt(0).toString(16);
  });
}

export const _String = {
  onlyDigits,
  formatPhone,
  isValidEmail,
  isValidCPF,
  isValidCNPJ,
  capitalize,
  capitalizeAll,
  rightPad,
  leftPad,
  removeNearestPatternFromIndex,
  getAddedCharacters,
  getRemovedCharacters,
  countMissingCharsBeforeIndex,
  getFirstDifferentIndex,
  getLastDifferentIndex,
  removeCharacters,
  noAccent,
  splitBalancedGroups,
  stringToCharCodeArray,
};
