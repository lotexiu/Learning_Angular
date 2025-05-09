import { SVGPath } from "../shapes/path";
import { SVGBaseSVGElement } from "../base/base-svg-element";
import { SVGCircle } from "../shapes/circle";
import { SVGImageElement } from "../images/image-element";
import { SVGLine } from "../shapes/line";
import { SVGPolygon } from "../shapes/polygon";
import { SVGRect } from "../shapes/rect";
import { SVGUse } from "./use";
import { SVGEllipse } from "../shapes/ellipse";
import { SVGText } from "../text/text";
import { SVGPolyline } from "../shapes/polyline";
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";
import { arrayAssign } from "@ts-extras/registry/functions/on-assign-functions";

class G extends SVGBaseSVGElement {
  @PropertyReflect(false, { type: G, onAssign: arrayAssign })
  groups?: G[];
  @PropertyReflect(false, { type: SVGPath, onAssign: arrayAssign })
  paths?: SVGPath[];
  @PropertyReflect(false, { type: SVGText, onAssign: arrayAssign })
  texts?: SVGText[];
  @PropertyReflect(false, { type: SVGRect, onAssign: arrayAssign })
  rects?: SVGRect[];
  @PropertyReflect(false, { type: SVGCircle, onAssign: arrayAssign })
  circles?: SVGCircle[];
  @PropertyReflect(false, { type: SVGEllipse, onAssign: arrayAssign })
  ellipses?: SVGEllipse[];
  @PropertyReflect(false, { type: SVGLine, onAssign: arrayAssign })
  lines?: SVGLine[];
  @PropertyReflect(false, { type: SVGPolygon, onAssign: arrayAssign })
  polygons?: SVGPolygon[];
  @PropertyReflect(false, { type: SVGPolyline, onAssign: arrayAssign })
  polylines?: SVGPolyline[];
  @PropertyReflect(false, { type: SVGImageElement, onAssign: arrayAssign })
  images?: SVGImageElement[];
  @PropertyReflect(false, { type: SVGUse, onAssign: arrayAssign })
  uses?: SVGUse[];
}

export {
  G as SVGG
}