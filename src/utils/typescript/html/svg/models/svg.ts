import { SVGBaseSVGElement } from "./base/base-svg-element";
import { SVGCircle } from "./shapes/circle";
import { SVGEllipse } from "./shapes/ellipse";
import { SVGG } from "./core/g";
import { SVGImageElement } from "./images/image-element";
import { SVGLine } from "./shapes/line";
import { SVGPolygon } from "./shapes/polygon";
import { SVGRect } from "./shapes/rect";
import { SVGUse } from "./core/use";
import { SVGDefs } from "./core/defs";
import { SVGText } from "./text/text";
import { SVGPolyline } from "./shapes/polyline";
import { SVGPath } from "./shapes/path";

class SVG extends SVGBaseSVGElement {
  /** Width of the SVG container */
  width?: number;

  /** Height of the SVG container */
  height?: number;

  /** Defines the aspect ratio and position of the SVG viewBox */
  viewBox?: string;

  /** Controls how the viewBox is preserved when scaled */
  preserveAspectRatio?: string;

  /** Horizontal position of the SVG container */
  x?: number;

  /** Vertical position of the SVG container */
  y?: number;

  /** XML namespace for SVG */
  xmlns?: string;

  /** XML namespace for xlink */
  xmlnsXlink?: string;

  // Allowed children
  defs?: SVGDefs;
  groups?: SVGG[];
  circles?: SVGCircle[];
  ellipses?: SVGEllipse[];
  paths?: SVGPath[];
  texts?: SVGText[];
  uses?: SVGUse[];
  rects?: SVGRect[];
  lines?: SVGLine[];
  polygons?: SVGPolygon[];
  polylines?: SVGPolyline[];
  images?: SVGImageElement[];
}

export {
  SVG 
}
