import { SVGGradientUnitsType, SVGSpreadMethodType } from "../../interfaces/svg-interfaces";

class RadialGradient {
  /** X coordinate of the gradient center */
  cx?: number;

  /** Y coordinate of the gradient center */
  cy?: number;

  /** Radius of the gradient */
  r?: number;

  /** Focal point x-coordinate */
  fx?: number;

  /** Focal point y-coordinate */
  fy?: number;

  /** Focal radius */
  fr?: number;

  /** Units used for the gradient */
  gradientUnits?: SVGGradientUnitsType;

  /** Transformation applied to the gradient */
  gradientTransform?: string;

  /** Reference to another gradient */
  href?: string;

  /** Spread method (pad, reflect, repeat) */
  spreadMethod?: SVGSpreadMethodType;
}

export {
  RadialGradient as SVGRadialGradient
}