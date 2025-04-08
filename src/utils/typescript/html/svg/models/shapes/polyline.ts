import { SVGBaseSVGElement } from "../base/base-svg-element";

class Polyline<T=Polyline<any>> extends SVGBaseSVGElement<T> {
  /** List of points in the polyline (x,y pairs) */
  points?: string;

  /** Total length of the path */
  pathLength?: number;
}

export {
  Polyline as SVGPolyline
}