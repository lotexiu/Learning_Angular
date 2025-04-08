import { SVGBaseSVGElement } from "../base/base-svg-element";

class Polygon<T=Polygon<any>> extends SVGBaseSVGElement<T> {
  /** List of points in the polygon (x,y pairs) */
  points?: string;

  /** Total length of the path */
  pathLength?: number;
}

export {
  Polygon as SVGPolygon
}
