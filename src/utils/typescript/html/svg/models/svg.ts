import { SVGBaseSVGElement } from "./base/base-svg-element";
import { SVGCircle } from "./shapes/circle";
import { SVGEllipse } from "./shapes/ellipse";
import { SVGG } from "./core/g";
import { SVGImageElement } from "./images/image-element";
import { SVGLine } from "./shapes/line";
import { SVGPolygon } from "./shapes/polygon";
import { SVGRect } from "./shapes/rect";
import { SVGUse } from "./core/use";
import { SVGDefs } from "./core/defs";
import { SVGText } from "./text/text";
import { SVGPolyline } from "./shapes/polyline";
import { SVGPath } from "./shapes/path";
import { Function } from "@ts-interfaces/function-interfaces";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { cLog } from "@ts-natives/console/console-utils";

class SVG extends SVGBaseSVGElement {
  /** Width of the SVG container */
  width?: number;

  /** Height of the SVG container */
  height?: number;

  /** Defines the aspect ratio and position of the SVG viewBox */
  viewBox?: string;

  /** Controls how the viewBox is preserved when scaled */
  preserveAspectRatio?: string;

  /** Horizontal position of the SVG container */
  x?: number;

  /** Vertical position of the SVG container */
  y?: number;

  /** XML namespace for SVG */
  xmlns?: string;

  /** XML namespace for xlink */
  xmlnsXlink?: string;

  // Allowed children
  defs?: SVGDefs;
  groups?: SVGG[];
  circles?: SVGCircle[];
  ellipses?: SVGEllipse[];
  paths?: SVGPath[];
  texts?: SVGText[];
  uses?: SVGUse[];
  rects?: SVGRect[];
  lines?: SVGLine[];
  polygons?: SVGPolygon[];
  polylines?: SVGPolyline[];
  images?: SVGImageElement[];  

  private intervalId: any;

  private _tickInteveral: number = 200;
  set tickInterval(value: number) {
    this._tickInteveral = value;
    this.buildInterval()
  }
  get tickInterval(): number {
    return this._tickInteveral;
  }

  private _onTick: Nullable<Function<[SVG]>>;
  set onTick(callback: Nullable<Function<[SVG]>>) {
    this._onTick = callback;
    this.buildInterval()
  }
  get onTick(): Nullable<Function<[SVG]>> {
    return this._onTick;
  }

  usedByElements: HTMLElement[] = []

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.onTick = null;
    }
  }

  private buildInterval(): void {
    this.usedByElements = this.usedByElements || []
    if (this.usedByElements.length == 0) {
      cLog(
        {type:'warn'}, 
        'No elements have been added to the SVG during the interval.\n'+
        'Please attach an element or remove onTick callback to stop '+
        'the interval or call stopInterval to prevent memory leaks.'
      );
    }

    this.stopInterval()
    if (this._onTick) {
      this.intervalId = setInterval(() => {
        if (!this.elementsStillExist()) {
          this.stopInterval()
        }
        this._onTick!(this);
      }, this._tickInteveral);
    }
  }

  private elementsStillExist(): boolean {
    return this.usedByElements.some((element: HTMLElement): boolean => {
      return document.body.contains(element);
    });
  }
}

export {
  SVG
};

