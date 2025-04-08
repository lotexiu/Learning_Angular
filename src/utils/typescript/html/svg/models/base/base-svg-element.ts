import { Class } from "@ts-natives/class/model/class";
import { SVGVisibilityType, SVGDisplayType } from "../../interfaces/svg-interfaces";
import { Object } from "@ts-natives/object/interfaces/object-interfaces";

// extends BaseSVGElement<T>=any
class BaseSVGElement<T> extends Class<Object<T>>{
  /** Fill color of the element */
  fill?: string;

  /** Stroke color of the element */
  stroke?: string;

  /** Opacity level from 0 (transparent) to 1 (opaque) */
  opacity?: number;

  /** Transformation applied to the element (e.g., rotate, scale) */
  transform?: string;

  /** Filter effects applied to the element */
  filter?: string;

  /** Visibility of the element (visible, hidden, collapse) */
  visibility?: SVGVisibilityType;

  /** Display type of the element (e.g., none, inline, block) */
  display?: SVGDisplayType;
}

export {
  BaseSVGElement as SVGBaseSVGElement
}