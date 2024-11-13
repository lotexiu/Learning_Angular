import { Nullable } from "../interfaces/interfaces";
import { Routes, _Route } from "./route";

const allRoutes: Routes[] = []

class RouteUtils {

  static getAllRoutes(): Routes[] {
    return allRoutes
  }
  
  static getRoute(path: string): Nullable<_Route> {
    const route: Nullable<_Route> = allRoutes.find((routes: Routes): string | undefined =>
      routes.paths.find((path: string): boolean =>
        path.includes(path)))?.routes.find((route: _Route): boolean =>
          path.includes(route.path || ''))
    return route
  }
}

export {
  allRoutes,
  RouteUtils
}