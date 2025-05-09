import { SVGLengthAdjustType } from "../../interfaces/svg-interfaces";
import { SVGTextBasedElement } from "../base/text-based-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Text extends SVGTextBasedElement {
  /** X-coordinate of the start of the text */
  @PropertyReflect(false, { description: 'X-coordinate of the start of the text' })
  x?: number;

  /** Y-coordinate of the start of the text */
  @PropertyReflect(false, { description: 'Y-coordinate of the start of the text' })
  y?: number;

  /** Shift along the x-axis */
  @PropertyReflect(false, { description: 'Shift along the x-axis' })
  dx?: number;

  /** Shift along the y-axis */
  @PropertyReflect(false, { description: 'Shift along the y-axis' })
  dy?: number;

  /** Rotation of the text characters */
  @PropertyReflect(false, { description: 'Rotation of the text characters' })
  rotate?: string;

  /** Method of adjusting text length */
  @PropertyReflect(false, { description: 'Method of adjusting text length' })
  lengthAdjust?: SVGLengthAdjustType;

  /** Total desired length of the text */
  @PropertyReflect(false, { description: 'Total desired length of the text' })
  textLength?: number;
}

export {
  Text as SVGText
}
