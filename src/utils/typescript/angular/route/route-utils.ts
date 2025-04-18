import { NavigationExtras, Router, RoutesRecognized } from "@angular/router";
import { RouteData } from "./interfaces/route.interface";
import { _Route, Routes } from "./route";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { LocalStorageUtils } from "@ts-utils/html/localstorage/localStorage-utils";
import { RegexUtils } from "@ts-natives/regex/regex-utils";
import { λ } from "@ts-natives/object/object-utils";

const RouteData: RouteData = {
  createdRoutes: []
} as any

class RouteUtils {

  static getAllRoutes(): Routes[] {
    return RouteData.createdRoutes
  }
  
  static getRoute(path: string): Nullable<_Route> {
    return RouteData.createdRoutes.find((routes: Routes) => {
      return path == `/${routes.fullPath}`
    })?.toRoute()
  }

  static setAngularRouter(angularRouter: Router): void {
    RouteData.router = angularRouter
    RouteData.routerEvents = RouteData.router.events.subscribe(λ(this as any, 'routeEvents'))
  }

  static setAppTitle(title: string): void {
    LocalStorageUtils.store('title', title) 
  }

  private static routeEvents(value: any): void {
    if (value instanceof RoutesRecognized) {
      RouteData.currentUrl = value.url
    }
  }

  static goTo(route: string, extras: NavigationExtras = {}): void {
    const router = RouteData.router
    if (route.startsWith('/')) {
      router.navigate([route], extras)
    } else {
      let path = `${RouteData.currentUrl}/${route}`
      if (!this.getRoute(path)) {
        path = `${RegexUtils.downPath(RouteData.currentUrl)}/${route}`
      }
      if (this.getRoute(path)) {
        router.navigate([path], extras)
      }
    }    
  }
}

export {
  RouteUtils,
  RouteData,
};

