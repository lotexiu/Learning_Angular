import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Rect extends SVGBaseSVGElement {
  /** X position of the rectangle */
  @PropertyReflect(false, { description: 'X position of the rectangle' })
  x?: number;

  /** Y position of the rectangle */
  @PropertyReflect(false, { description: 'Y position of the rectangle' })
  y?: number;

  /** Width of the rectangle */
  @PropertyReflect(false, { description: 'Width of the rectangle' })
  width?: number;

  /** Height of the rectangle */
  @PropertyReflect(false, { description: 'Height of the rectangle' })
  height?: number;

  /** X-axis radius for rounded corners */
  @PropertyReflect(false, { description: 'X-axis radius for rounded corners' })
  rx?: number;

  /** Y-axis radius for rounded corners */
  @PropertyReflect(false, { description: 'Y-axis radius for rounded corners' })
  ry?: number;

  /** Total length of the path */
  @PropertyReflect(false, { description: 'Total length of the path' })
  pathLength?: number;
}

export {
  Rect as SVGRect
}