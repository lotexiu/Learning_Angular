import { SVGGradientUnitsType, SVGSpreadMethodType } from "../../interfaces/svg-interfaces";

class LinearGradient {
  /** X coordinate of gradient start */
  x1?: number;

  /** Y coordinate of gradient start */
  y1?: number;

  /** X coordinate of gradient end */
  x2?: number;

  /** Y coordinate of gradient end */
  y2?: number;

  /** Units used for the gradient (userSpaceOnUse or objectBoundingBox) */
  gradientUnits?: SVGGradientUnitsType;

  /** Transformation applied to the gradient */
  gradientTransform?: string;

  /** Reference to another gradient */
  href?: string;

  /** Spread method (pad, reflect, repeat) */
  spreadMethod?: SVGSpreadMethodType;
}

export {
  LinearGradient as SVGLinearGradient
}