import { RGBAColor } from "../interfaces/interfaces"

class ColorUtils {

  static newColor<T=number|string>(r:T=255 as T,
                                  g:T=255 as T,
                                  b:T=255 as T,
                                  a:T=1 as T): RGBAColor{
    return {
      r: parseInt(r as string),
      g: parseInt(g as string),
      b: parseInt(b as string),
      a: parseInt(a as string),
      isBlack: function(min=35): boolean{
        let colors = [this.r,this.g,this.b]
        return colors.filter((color)=>min ? color < min : color == 0).length == 3
      },
      isWhite: function(): boolean{
        return [this.r,this.g,this.b].filter((color)=>color == 255).length == 3
      },
      isTransparent: function(): boolean{
        return this.a == 0
      },
    }
  }

  static checkForBlackColor(backgroundStyle: string): boolean {
    // Expressão para encontrar preto em RGB ou RGBA
    const blackColorRegex = /rgba?\(0,\s*0,\s*0(?:,\s*1)?\)/;
    return blackColorRegex.test(backgroundStyle);
  }

  static getRGBAColorFromString(colorString: string): RGBAColor[] {
    const rgbaColors: RGBAColor[] = [];
    // Função para extrair o valor RGBA de uma string
    function extractRGBAFromString(colorString: string): RGBAColor | null {
      const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
      const match = colorString.match(rgbaRegex);
      if (match) {
        return ColorUtils.newColor(match[1],match[2],match[3])
      }
      return null;
    }

    // Extrai cores de uma string
    const colors = colorString.match(/rgba?\((.*?)\)/g);
    if (colors) {
      colors.forEach(color => {
        const rgbaColor = extractRGBAFromString(color);
        if (rgbaColor) {
          rgbaColors.push(rgbaColor);
        }
      });
    }
    if (colorString.includes("gradient")) {
      rgbaColors.shift() // remove a primeira cor pois é inutil e não faz parte do gradiente.
    }
    return rgbaColors;
  }

}

export {
  ColorUtils
}