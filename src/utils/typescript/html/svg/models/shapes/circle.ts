import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Circle extends SVGBaseSVGElement {
  /** X-coordinate of the center */
  @PropertyReflect(false, { description: 'X-coordinate of the center' })
  cx?: number;

  /** Y-coordinate of the center */
  @PropertyReflect(false, { description: 'Y-coordinate of the center' })
  cy?: number;

  /** Radius of the circle */
  @PropertyReflect(false, { description: 'Radius of the circle' })
  r?: number;

  /** Total length of the path for animation and effects */
  @PropertyReflect(false, { description: 'Total length of the path for animation and effects' })
  pathLength?: number;
}

export {
  Circle as SVGCircle
}