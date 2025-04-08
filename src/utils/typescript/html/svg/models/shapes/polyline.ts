import { SVGBaseSVGElement } from "../base/base-svg-element";

class Polyline extends SVGBaseSVGElement {
  /** List of points in the polyline (x,y pairs) */
  points?: string;

  /** Total length of the path */
  pathLength?: number;
}

export {
  Polyline as SVGPolyline
}