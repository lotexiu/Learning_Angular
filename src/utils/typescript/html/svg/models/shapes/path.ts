import { SVGBaseSVGElement } from "../base/base-svg-element";

class Path<T=Path<any>> extends SVGBaseSVGElement<T> {
  /** A string containing the path commands */
  d?: string;

  /** Total length of the path */
  pathLength?: number;
}

export {
  Path as SVGPath
}
