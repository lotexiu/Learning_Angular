import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Line extends SVGBaseSVGElement {
  /** Starting x-coordinate */
  @PropertyReflect(false, { description: 'Starting x-coordinate' })
  x1?: number;

  /** Starting y-coordinate */
  @PropertyReflect(false, { description: 'Starting y-coordinate' })
  y1?: number;

  /** Ending x-coordinate */
  @PropertyReflect(false, { description: 'Ending x-coordinate' })
  x2?: number;

  /** Ending y-coordinate */
  @PropertyReflect(false, { description: 'Ending y-coordinate' })
  y2?: number;

  /** Total length of the line */
  @PropertyReflect(false, { description: 'Total length of the line' })
  pathLength?: number;
}

export {
  Line as SVGLine
}