import { SVGFilterFE } from "../base-filter-fe";

class FeSpecularLighting extends SVGFilterFE {
  surfaceScale?: number;
  specularConstant?: number;
  specularExponent?: number;
  lightingColor?: string;
}

export {
  FeSpecularLighting
}