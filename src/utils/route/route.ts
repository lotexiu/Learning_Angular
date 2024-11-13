import { Route as AngularRoute } from "@angular/router";
import * as RouteInterfaces from "./route.interface";
import { allRoutes } from "./route-utils";

class Routes {
  routes: _Route[] = []
  paths : string[] = []

  constructor(public path: string) { 
    allRoutes.push(this)
  }

  newRoute(title: string, path: string, component: RouteInterfaces.Component_): Routes {
    const route = new _Route()
    route.path = `${this.path}/${path}`
    route.title = `${localStorage['title']} (${title})`
    route.component = component
    route.subTitle = title
    this.routes.push(route)
    this.paths.push(route.path)
    return this
  }
}

class _Route implements AngularRoute {
  canActivate?: RouteInterfaces.CanActivate_;
  canActivateChild?: RouteInterfaces.CanActivateChild_;
  canDeactivate?: RouteInterfaces.CanDeactivate_;
  canMatch?: RouteInterfaces.CanMatch_;
  children?: RouteInterfaces.Children_;
  component?: RouteInterfaces.Component_;
  data?: RouteInterfaces.Data_;
  loadChildren?: RouteInterfaces.LoadChildren_;
  matcher?: RouteInterfaces.Matcher_;
  outlet?: RouteInterfaces.Outlet_;
  path?: RouteInterfaces.Path_;
  pathMatch?: RouteInterfaces.PathMatch_;
  providers?: RouteInterfaces.Providers_;
  redirectTo?: RouteInterfaces.RedirectTo_;
  resolve?: RouteInterfaces.Resolve_;
  runGuardsAndResolvers?: RouteInterfaces.RunGuardsAndResolvers_;
  title?: RouteInterfaces.Title_;
  subTitle?: string;
  loadComponent?: RouteInterfaces.LoadComponent_;
}

export {
  Routes,
  _Route,
};