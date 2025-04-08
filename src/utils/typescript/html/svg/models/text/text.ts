import { SVGLengthAdjustType } from "../../interfaces/svg-interfaces";
import { SVGTextBasedElement } from "../base/text-based-element";

class Text extends SVGTextBasedElement {
  /** X-coordinate of the start of the text */
  x?: number;

  /** Y-coordinate of the start of the text */
  y?: number;

  /** Shift along the x-axis */
  dx?: number;

  /** Shift along the y-axis */
  dy?: number;

  /** Rotation of the text characters */
  rotate?: string;

  /** Method of adjusting text length */
  lengthAdjust?: SVGLengthAdjustType;

  /** Total desired length of the text */
  textLength?: number;
}

export {
  Text as SVGText
}
