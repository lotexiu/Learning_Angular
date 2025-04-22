import { SVGBaseSVGElement } from "../base/base-svg-element";

class Ellipse extends SVGBaseSVGElement {
  /** X-coordinate of the center */
  cx?: number;

  /** Y-coordinate of the center */
  cy?: number;

  /** Radius along the x-axis */
  rx?: number;

  /** Radius along the y-axis */
  ry?: number;

  /** Total length of the path for animation and effects */
  pathLength?: number;
}

export {
  Ellipse as SVGEllipse
}