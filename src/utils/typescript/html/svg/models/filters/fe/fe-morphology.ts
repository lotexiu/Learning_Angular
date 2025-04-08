import { SVGFilterFE } from "../base-filter-fe";

class FeMorphology extends SVGFilterFE {
  operator?: 'erode' | 'dilate';
  radius?: string;
}

export {
  FeMorphology
}