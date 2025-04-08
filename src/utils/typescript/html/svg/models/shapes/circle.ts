import { SVGBaseSVGElement } from "../base/base-svg-element";

class Circle<T=Circle<any>> extends SVGBaseSVGElement<T> {
  /** X-coordinate of the center */
  cx?: number;

  /** Y-coordinate of the center */
  cy?: number;

  /** Radius of the circle */
  r?: number;

  /** Total length of the path for animation and effects */
  pathLength?: number;
}

export {
  Circle as SVGCircle
}