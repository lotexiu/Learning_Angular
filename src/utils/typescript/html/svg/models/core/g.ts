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

class G extends SVGBaseSVGElement {
  groups?: G[];
  paths?: SVGPath[];
  texts?: SVGText[];
  rects?: SVGRect[];
  circles?: SVGCircle[];
  ellipses?: SVGEllipse[];
  lines?: SVGLine[];
  polygons?: SVGPolygon[];
  polylines?: SVGPolyline[];
  images?: SVGImageElement[];
  uses?: SVGUse[];
}

export {
  G as SVGG
}