import { SVGBaseSVGElement } from "../base/base-svg-element";

class ImageElement extends SVGBaseSVGElement {
  /** Image source URL */
  href?: string;

  /** X position of the image */
  x?: number;

  /** Y position of the image */
  y?: number;

  /** Width of the image */
  width?: number;

  /** Height of the image */
  height?: number;

  /** Aspect ratio preservation rules */
  preserveAspectRatio?: string;
}

export {
  ImageElement as SVGImageElement
}