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
import { PropertyReflect } from "@ts-extras/registry/decorators/decorators";
import { arrayAssign } from "@ts-extras/registry/functions/on-assign-functions";

class SVG extends SVGBaseSVGElement {
  @PropertyReflect(false, {description: 'Width of the SVG container'})
  width?: number;
  @PropertyReflect(false, {description: 'Height of the SVG container'})
  height?: number;
  @PropertyReflect(false, {description: 'Defines the aspect ratio and position of the SVG viewBox'})
  viewBox?: string;
  @PropertyReflect(false, {description: 'Controls how the viewBox is preserved when scaled'})
  preserveAspectRatio?: string;
  @PropertyReflect(false, {description: 'Horizontal position of the SVG container'})
  x?: number;
  @PropertyReflect(false, {description: 'Vertical position of the SVG container'})
  y?: number;
  @PropertyReflect(false, {description: 'XML namespace for SVG'})
  xmlns?: string;
  @PropertyReflect(false, {description: 'XML namespace for xlink'})
  xmlnsXlink?: string;

  @PropertyReflect(false, {type: SVGDefs})
  defs?: SVGDefs;
  @PropertyReflect(false, {
    type: SVGG,
    onAssign:arrayAssign
  })
  groups?: SVGG[];
  @PropertyReflect(false, {
    type: SVGCircle,
    onAssign:arrayAssign
  })
  circles?: SVGCircle[];
  @PropertyReflect(false, {
    type: SVGEllipse,
    onAssign:arrayAssign
  })
  ellipses?: SVGEllipse[];
  @PropertyReflect(false, {
    type: SVGPath,
    onAssign:arrayAssign
  })
  paths?: SVGPath[];
  @PropertyReflect(false, {
    type: SVGText,
    onAssign:arrayAssign
  })
  texts?: SVGText[];
  @PropertyReflect(false, {
    type: SVGUse,
    onAssign:arrayAssign
  })
  uses?: SVGUse[];
  @PropertyReflect(false, {
    type: SVGRect,
    onAssign:arrayAssign
  })
  rects?: SVGRect[];
  @PropertyReflect(false, {
    type: SVGLine,
    onAssign:arrayAssign
  })
  lines?: SVGLine[];
  @PropertyReflect(false, {
    type: SVGPolygon,
    onAssign:arrayAssign
  })
  polygons?: SVGPolygon[];
  @PropertyReflect(false, {
    type: SVGPolyline,
    onAssign:arrayAssign
  })
  polylines?: SVGPolyline[];
  @PropertyReflect(false, {
    type: SVGImageElement,
    onAssign:arrayAssign
  })
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

