import { Component, inject, ElementRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router, Routes, Route, NavigationExtras } from "@angular/router";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { isNull } from "@ts-natives/object/object-utils";
import { FormUtils } from "@ts-utils/html/form/form-utils";
import { focusUntilSuccess } from "@ts-utils/html/html-utils";
import { Subject } from "rxjs";
import { createDebounce } from "../component-utils";


@Component({
  template: ''
})
export abstract class Base {
  public readonly route: ActivatedRoute = inject(ActivatedRoute);
  public readonly router = inject(Router);
  public readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>)

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get lockActions(): boolean {
    return this.element.style.pointerEvents === 'none';
  }
  set lockActions(value: boolean) {
    const preventFunction: Function = (event: Event): void =>{
      event.preventDefault();
      event.stopPropagation();
    }
    this.element.style.pointerEvents = value ? 'none' : '';
    this.element.onkeydown = value ? preventFunction as any : null;
    this.element.onkeyup = value ? preventFunction as any : null;
  }

  findBestMatchingRoute(routes: Routes, path: string[]): Nullable<Route> {
    const matchingRoutes = routes.filter(
      (children: Route) => (children.path || '').split('/').length === path.length
    );
    if (matchingRoutes.length === 0) {
      return null;
    }
    const bestMatch = matchingRoutes
      .map((route: Route) => {
        const segments: string[] = (route.path || '').split('/');
        let score: number = 0;
        let hasDynamicSegment: boolean = false;

        segments.forEach((segment: string, index: number): void  => {
          if (segment === path[index]) score += 2;
          else if (segment.startsWith(':')) {
            score += 1;
            hasDynamicSegment = true;
          }
        });
        return { route, score, hasDynamicSegment };
      })
      .sort((a, b) => b.score - a.score)[0];
      
    return bestMatch && (bestMatch.score > 0)
      ? bestMatch.route
      : null;
  }


  goTo(path: string, extras?: NavigationExtras): void;
  goTo(path: string[], extras?: NavigationExtras): void;
  goTo(path: any, extras?: NavigationExtras): void {
    extras = {relativeTo: this.route, ...extras};
    const pathList: string[] = Array.isArray(path) ? path : path.split('/');
    const fullPath: string = pathList.join('/');
    if (fullPath.startsWith('../') || fullPath.startsWith('/')) {
      this.router.navigate([pathList], extras);
      return
    }
    const currentChildrens: Routes = (this.route.routeConfig?.children||[])
    const parentChildrens: Routes = (this.route.parent?.routeConfig?.children||[])

    if (this.findBestMatchingRoute(currentChildrens, pathList)) {
      this.router.navigate(pathList, extras);
    } 
    else if (this.findBestMatchingRoute(parentChildrens, pathList)) {
      const amountToGoBack: number = (this.route.routeConfig?.path?.split('/') || []).length;
      const backPath: string = '../'.repeat(amountToGoBack)
      this.router.navigate([backPath, ...pathList], extras);
    } else {
      this.router.navigate(pathList, extras);
    }
  }

  isNull<T>(value: Nullable<T>, ...customNullValues: any[]): value is Nullable<null> {
    return isNull(value, ...customNullValues);
  }

  focusUntilSuccess(element?: HTMLElement|string, maxAttempts: number = 5): void {
    if(element){
      focusUntilSuccess(element, maxAttempts);
    }
  }

  createDebounce(functionName: string, debounce: number): Subject<any> {
    return createDebounce(this as any, functionName as any, debounce);
  }
  
  getControlsWithErrors(form: FormGroup) {
    return FormUtils.getControlsWithErrors(form);
  }

  getFirstErrorInControl(control: any): string {
    return FormUtils.getFirstErrorInControl(control);
  }
}