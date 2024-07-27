import { getAvarage } from "./math-utils";

class RGBAColor {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 0,
  ) { }

  private avg = 127.5

  itsBrighter(): boolean {
    const { a, b, g, avg } = this
    return getAvarage(a, b, g) > avg
  }

  itsDarker(): boolean {
    const { a, b, g, avg } = this
    return getAvarage(a, b, g) < avg
  }

  itsTransparent(): boolean {
    return this.a < 1
  }

  itsInvisible(): boolean {
    return !this.a
  }
}

namespace ColorUtils {
  export function getRGBAColorFromString(colorString: string): RGBAColor {
    const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
    const match:RegExpMatchArray = colorString.match(rgbaRegex)!;
    return new RGBAColor(Number(match[1]), Number(match[2]), Number(match[3]))
  }

}

const {
  getRGBAColorFromString
} = ColorUtils

export {
  RGBAColor,
  ColorUtils,
  getRGBAColorFromString,
}