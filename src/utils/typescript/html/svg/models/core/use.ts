import { SVGBaseSVGElement } from "../base/base-svg-element";

class Use extends SVGBaseSVGElement {
  /** Reference to another element using URL syntax */
  href?: string;

  /** X position of the reused element */
  x?: number;

  /** Y position of the reused element */
  y?: number;

  /** Width of the reused element */
  width?: number;

  /** Height of the reused element */
  height?: number;
}

export {
  Use as SVGUse
}