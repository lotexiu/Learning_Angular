﻿import { Nullable } from "../../interfaces/misc-interfaces";
import { mathBetweenMinMax, mathDivide, mathInterpolate } from "../../natives/math/math-utils";
import { copy } from "../../natives/object/object-utils";
import { Color } from "./interfaces/color-interface";

class ColorUtils {
  
  static hexToRGB(hex: string): Nullable<Color> {
    var shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    hex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string, a: string): string => {
      return r + r + g + g + b + b + (a ? a + a : '');
    });
    var result: Nullable<RegExpExecArray> = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    return result ? {
      R: parseInt(result[1], 16),
      G: parseInt(result[2], 16),
      B: parseInt(result[3], 16),
      A: result[4] ? parseInt(result[4], 16) / 255 : undefined
    } : null;
  }
  
  static RGBToHex(color: Color): string {
    var { R, G, B, A } = color;
    var alphaHex = A !== undefined ? ((A * 255) | 1 << 8).toString(16).slice(1) : '';
    return "#" + (1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1) + alphaHex;
  }

  static interpolate(t: number, ...values: Color[]): Color {
    const color: Color = {B: 0, G: 0, R: 0, A: 0};
    const keys: (keyof Color)[] = Object.keys(color) as any;
    keys.forEach((part: keyof Color): any => {
      let keyValues: number[] = values.map((color: Color): number => color[part]||1)
      color[part] = mathInterpolate(t, ...keyValues)
    })
    return color;
  }

  static gradiantOfColor(color: Color, steps:number=16): Color[] {
    const white = {R: 255, G: 255, B: 255, A: 1};
    const black = {R: 0, G: 0, B: 0, A: 1};

    const colors: Color[] = [];
    for (let i: number = 0; i < steps; i++) {
      const t: number = mathDivide(1, steps)["*"](i);
      const middle: number = mathDivide(1, steps)["*"](steps["/"](2));
      let interpolatedColor: Color = color
      switch (mathBetweenMinMax(i,middle,middle)) {
        case 1:
          interpolatedColor = this.interpolate(t, color, white);
          break
        case -1:
          interpolatedColor = this.interpolate(t, color, black);
      }
      colors.push(interpolatedColor);
    }
    return colors;
  }
}

export {
  ColorUtils
}

const {
  colorHexToRGB,
  colorRGBToHex,
  colorInterpolate,
} = copy(ColorUtils, 'color')

export {
  colorHexToRGB,
  colorRGBToHex,
  colorInterpolate,
}