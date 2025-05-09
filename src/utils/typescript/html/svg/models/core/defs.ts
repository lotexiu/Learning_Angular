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
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";
import { arrayAssign } from "@ts-extras/registry/functions/on-assign-functions";

class Defs extends SVGBaseSVGElement {
  @PropertyReflect(false, { type: SVGFilter, onAssign: arrayAssign })
  filters?: SVGFilter[];
  @PropertyReflect(false, { type: SVGG, onAssign: arrayAssign })
  groups?: SVGG[];
  @PropertyReflect(false, { type: SVGPath, onAssign: arrayAssign })
  paths?: SVGPath[];
  @PropertyReflect(false, { type: SVGLinearGradient, onAssign: arrayAssign })
  gradientsLinear?: SVGLinearGradient[];
  @PropertyReflect(false, { type: SVGRadialGradient, onAssign: arrayAssign })
  gradientsRadial?: SVGRadialGradient[];
  @PropertyReflect(false, { type: SVGRect, onAssign: arrayAssign })
  rects?: SVGRect[];
  @PropertyReflect(false, { type: SVGCircle, onAssign: arrayAssign })
  circles?: SVGCircle[];
  @PropertyReflect(false, { type: SVGEllipse, onAssign: arrayAssign })
  ellipses?: SVGEllipse[];
  @PropertyReflect(false, { type: SVGUse, onAssign: arrayAssign })
  uses?: SVGUse[];
  @PropertyReflect(false, { type: SVGImageElement, onAssign: arrayAssign })
  images?: SVGImageElement[];
}

export {
  Defs as SVGDefs
}