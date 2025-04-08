import { SVGBaseSVGElement } from "../base/base-svg-element";

class ImageElement<T=ImageElement<any>> extends SVGBaseSVGElement<T> {
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