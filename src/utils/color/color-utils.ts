import { interpolate } from "../easy-use";
import { Nullable } from "../interfaces/misc-interfaces";
import { GenericUtils } from "../unkown/generic-utils";
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
      color[part] = interpolate(t, ...keyValues)
    })
    return color;
  }
}

export {
  ColorUtils
}