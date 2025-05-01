import { SVGBaseSVGElement } from "../base/base-svg-element";

class Rect extends SVGBaseSVGElement {
  /** X position of the rectangle */
  x?: number;

  /** Y position of the rectangle */
  y?: number;

  /** Width of the rectangle */
  width?: number;

  /** Height of the rectangle */
  height?: number;

  /** X-axis radius for rounded corners */
  rx?: number;

  /** Y-axis radius for rounded corners */
  ry?: number;

  /** Total length of the path */
  pathLength?: number;
}

export {
  Rect as SVGRect
}