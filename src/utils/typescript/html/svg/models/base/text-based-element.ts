import { SVGTextAnchorType } from "../../interfaces/svg-interfaces";
import { SVGBaseSVGElement } from "./base-svg-element";


class TextBasedElement<T=TextBasedElement<any>> extends SVGBaseSVGElement<T> {
  /** Font size (e.g., 12px, 1em) */
  fontSize?: string;

  /** Font family name (e.g., Arial, sans-serif) */
  fontFamily?: string;

  /** Text alignment (start, middle, end) */
  textAnchor?: SVGTextAnchorType;
}

export {
  TextBasedElement as SVGTextBasedElement
}