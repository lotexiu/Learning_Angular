import { SVGFilterFE } from "../base-filter-fe";

class FeDisplacementMap extends SVGFilterFE {
  in2?: string;
  scale?: number;
  xChannelSelector?: string;
  yChannelSelector?: string;
}

export {
  FeDisplacementMap
}