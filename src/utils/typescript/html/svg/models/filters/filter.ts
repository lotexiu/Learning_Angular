import { SVGFilterUnitsType, SVGPrimitiveUnitsType } from "../../interfaces/svg-interfaces";
import { SVGFilterFE } from "./base-filter-fe";

class Filter {
  /** X position of the filter region */
  x?: number;

  /** Y position of the filter region */
  y?: number;

  /** Width of the filter region */
  width?: number;

  /** Height of the filter region */
  height?: number;

  /** Coordinate system for the filter (userSpaceOnUse or objectBoundingBox) */
  filterUnits?: SVGFilterUnitsType;

  /** Coordinate system for filter primitives */
  primitiveUnits?: SVGPrimitiveUnitsType;

  /** Reference to another filter */
  href?: string;

  feList?: SVGFilterFE[];
}

export {
  Filter as SVGFilter
}