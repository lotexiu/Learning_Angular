import { SVGPath } from "../shapes/path";
import { SVGBaseSVGElement } from "../base/base-svg-element";
import { SVGCircle } from "../shapes/circle";
import { SVGFilter } from "../filters/filter";
import { SVGImageElement } from "../images/image-element";
import { SVGLinearGradient } from "../gradients/linear-gradient";
import { SVGRadialGradient } from "../shapes/radial-gradient";
import { SVGRect } from "../shapes/rect";
import { SVGUse } from "./use";
import { SVGEllipse } from "../shapes/ellipse";
import { SVGG } from "./g";

class Defs extends SVGBaseSVGElement<Defs> {
  filters?: SVGFilter[];
  groups?: SVGG[];
  paths?: SVGPath[];
  gradientsLinear?: SVGLinearGradient[];
  gradientsRadial?: SVGRadialGradient[];
  rects?: SVGRect[];
  circles?: SVGCircle[];
  ellipses?: SVGEllipse[];
  uses?: SVGUse[];
  images?: SVGImageElement[];
}

export {
  Defs as SVGDefs
}