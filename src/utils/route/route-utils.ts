import { Nullable } from "../interfaces/interfaces";
import { Routes, _Route } from "./route";

const allRoutes: Routes[] = []

class RouteUtils {

  static getAllRoutes(): Routes[] {
    return allRoutes
  }
  
  static getRoute(path: string): Nullable<_Route> {
    return allRoutes.find((routes: Routes) => {
      return path == `/${routes.fullPath}`
    })?.toRoute()
  }
}

export {
  allRoutes,
  RouteUtils
}
