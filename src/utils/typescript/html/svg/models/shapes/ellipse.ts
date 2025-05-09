import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Ellipse extends SVGBaseSVGElement {
  /** X-coordinate of the center */
  @PropertyReflect(false, { description: 'X-coordinate of the center' })
  cx?: number;

  /** Y-coordinate of the center */
  @PropertyReflect(false, { description: 'Y-coordinate of the center' })
  cy?: number;

  /** Radius along the x-axis */
  @PropertyReflect(false, { description: 'Radius along the x-axis' })
  rx?: number;

  /** Radius along the y-axis */
  @PropertyReflect(false, { description: 'Radius along the y-axis' })
  ry?: number;

  /** Total length of the path for animation and effects */
  @PropertyReflect(false, { description: 'Total length of the path for animation and effects' })
  pathLength?: number;
}

export {
  Ellipse as SVGEllipse
}