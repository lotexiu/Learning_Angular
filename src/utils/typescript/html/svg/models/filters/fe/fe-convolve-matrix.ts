import { SVGFilterFE } from "../base-filter-fe";

class FeConvolveMatrix extends SVGFilterFE {
  order?: string;
  kernelMatrix?: string;
}

export {
  FeConvolveMatrix
}