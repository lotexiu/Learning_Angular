import { SVGFilterFE } from "../base-filter-fe";

class FeBlend extends SVGFilterFE {
  in2?: string;
  mode?: 'normal' | 'multiply' | 'screen' | 'darken' | 'lighten';
}