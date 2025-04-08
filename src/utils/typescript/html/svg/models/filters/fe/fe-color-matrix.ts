import { SVGFilterFE } from "../base-filter-fe";

class FeColorMatrix extends SVGFilterFE {
  type?: 'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha';
  values?: string;
}