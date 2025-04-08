import { Class } from "@ts-natives/class/model/class";

class SVGFilterFE extends Class<SVGFilterFE> {
  /** Input source for the filter */
  in?: string;

  /** Name for the result of the filter to reference later */
  result?: string;


  /** X position of the filter primitive */
  x?: string;

  /** Y position of the filter primitive */
  y?: string;

  /** Width of the filter primitive region */
  width?: string;

  /** Height of the filter primitive region */
  height?: string;
}

/** Merges multiple filter inputs into one */
class FEMerge extends SVGFilterFE {
  /** List of input sources to merge */
  mergeNodes?: FEMergeNode[];
}

/** Represents a single input in a merge operation */
class FEMergeNode {
  /** Source input to merge */
  in?: string;
}

export {
  SVGFilterFE
}