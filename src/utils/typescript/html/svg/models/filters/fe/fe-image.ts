import { SVGFilterFE } from "../base-filter-fe";

class FeImage extends SVGFilterFE {
  href?: string;
  preserveAspectRatio?: string;
}

export {
  FeImage
}