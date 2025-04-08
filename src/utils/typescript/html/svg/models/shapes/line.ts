import { SVGBaseSVGElement } from "../base/base-svg-element";

class Line<T=Line<any>> extends SVGBaseSVGElement<T> {
  /** Starting x-coordinate */
  x1?: number;

  /** Starting y-coordinate */
  y1?: number;

  /** Ending x-coordinate */
  x2?: number;

  /** Ending y-coordinate */
  y2?: number;

  /** Total length of the line */
  pathLength?: number;
}

export {
  Line as SVGLine
}