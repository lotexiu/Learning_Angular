import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Polyline extends SVGBaseSVGElement {
  /** List of points in the polyline (x,y pairs) */
  @PropertyReflect(false, { description: 'List of points in the polyline (x,y pairs)' })
  points?: string;

  /** Total length of the path */
  @PropertyReflect(false, { description: 'Total length of the path' })
  pathLength?: number;
}

export {
  Polyline as SVGPolyline
}