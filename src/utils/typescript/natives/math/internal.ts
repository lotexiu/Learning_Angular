import { _Object } from "@ts-natives/object/internal";
import { By10Type, Compare } from "./interfaces/math-interfaces";

function by10(value: number, type: By10Type): number {
  return type == 'multiply' ? value * 10 : value / 10;
}

function getAvarage(...numbers: number[]): number {
  const total: number = numbers.reduce((p: number, c: number): number => p + c);
  return total / numbers.length;
}

function betweenMinMax(value: number, min?: number, max?: number): Compare {
  return (
    !_Object.isNull(min) && value < min! ? -1 :
    !_Object.isNull(max) && value > max! ? 1 : 0
  );
}

function minMax(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function divide(value: number, ...divideValues: number[]): number {
  return [value, ...divideValues].reduce((p: number, c: number): number =>
    by10(p, 'multiply') / by10(c, 'multiply')
  );
}

function multiply(value: number, ...multiplyValues: number[]): number {
  return [value, ...multiplyValues].reduce((p: number, c: number): number =>
    (by10(p, 'multiply') * by10(c, 'multiply')) / 100
  );
}

function sum(value: number, ...plusValues: number[]): number {
  return [value, ...plusValues].reduce((p: number, c: number): number =>
    by10(by10(p, 'multiply') + by10(c, 'multiply'), 'divide')
  );
}

function minus(value: number, ...minusValues: number[]): number {
  return [value, ...minusValues].reduce((p: number, c: number): number =>
    by10(by10(p, 'multiply') - by10(c, 'multiply'), 'divide')
  );
}

function mod(dividend: number, divisor: number): number {
  return by10(by10(dividend, 'multiply') % by10(divisor, 'multiply'), 'divide');
}

function hasDecimals(value: number): boolean {
  return value.toFixed(0) != value.toString();
}

function getDecimals(value: number): number | undefined {
  let decimals: string = value.toString().split('.')[1];
  return Number(decimals) || undefined;
}

function random(min: number, max: number): number {
  const withDecimal: boolean = min % 1 !== 0 || max % 1 !== 0;
  const decimalsSize: number = Math.max(
    `${min}`.split('.')[1]?.length || 0,
    `${max}`.split('.')[1]?.length || 0
  );
  if (withDecimal) {
    return Number((Math.random() * (max - min) + min).toFixed(decimalsSize));
  } else {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

function interpolate(t: number, ...values: number[]): number {
  const n: number = values.length - 1;
  if (t >= 1) return values[n];
  const i: number = Math.floor(t * n);
  const a: number = values[i];
  const b: number = values[i + 1];
  const localT: number = (t - i / n) * n;
  return _interpolate(a, b, localT);
}

function _interpolate(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function pow(value: number, ...values: number[]): number {
  return [value, ...values].reduce((p: number, c: number): number => Math.pow(p, c));
}

function transition(factor: number, columns: number): number[] {
  const value: number = interpolate(factor, 1, columns + 1) - 1;
  const percentage: number = 1 - mod(value, 1);
  const idx: number = Math.floor(value) == columns ? 0 : Math.floor(value);
  const nextIdx: number = idx + 1 >= columns ? 0 : idx + 1;
  const array: number[] = new Array(columns).fill(0);
  array[idx] = percentage;
  array[nextIdx] = 1 - percentage;
  return array;
}

export const _Math = {
  by10,
  getAvarage,
  betweenMinMax,
  minMax,
  divide,
  multiply,
  sum,
  minus,
  mod,
  hasDecimals,
  getDecimals,
  random,
  interpolate,
  pow,
  transition,
};