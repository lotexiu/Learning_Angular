import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class Use extends SVGBaseSVGElement {
  /** Reference to another element using URL syntax */
  @PropertyReflect(false, { description: 'Reference to another element using URL syntax' })
  href?: string;

  /** X position of the reused element */
  @PropertyReflect(false, { description: 'X position of the reused element' })
  x?: number;

  /** Y position of the reused element */
  @PropertyReflect(false, { description: 'Y position of the reused element' })
  y?: number;

  /** Width of the reused element */
  @PropertyReflect(false, { description: 'Width of the reused element' })
  width?: number;

  /** Height of the reused element */
  @PropertyReflect(false, { description: 'Height of the reused element' })
  height?: number;
}

export {
  Use as SVGUse
}