import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Path extends SVGBaseSVGElement {
  /** A string containing the path commands */
  @PropertyReflect(false, { description: 'A string containing the path commands' })
  d?: string;

  /** Total length of the path */
  @PropertyReflect(false, { description: 'Total length of the path' })
  pathLength?: number;
}

export {
  Path as SVGPath
}
