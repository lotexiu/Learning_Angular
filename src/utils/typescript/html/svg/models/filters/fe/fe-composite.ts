import { SVGFilterFE } from "../base-filter-fe";

class FeComposite extends SVGFilterFE {
  in2?: string;
  operator?: 'over' | 'in' | 'out' | 'atop' | 'xor' | 'lighter' | 'arithmetic';
  k1?: number;
  k2?: number;
  k3?: number;
  k4?: number;
}