import { SVGBaseSVGElement } from "../base/base-svg-element";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";

class ImageElement extends SVGBaseSVGElement {
  /** Image source URL */
  @PropertyReflect(false, { description: 'Image source URL' })
  href?: string;

  /** X position of the image */
  @PropertyReflect(false, { description: 'X position of the image' })
  x?: number;

  /** Y position of the image */
  @PropertyReflect(false, { description: 'Y position of the image' })
  y?: number;

  /** Width of the image */
  @PropertyReflect(false, { description: 'Width of the image' })
  width?: number;

  /** Height of the image */
  @PropertyReflect(false, { description: 'Height of the image' })
  height?: number;

  /** Aspect ratio preservation rules */
  @PropertyReflect(false, { description: 'Aspect ratio preservation rules' })
  preserveAspectRatio?: string;
}

export {
  ImageElement as SVGImageElement
}