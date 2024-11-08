import { Route as AngularRoute } from "@angular/router";
import * as RouteInterfaces from "./route.interface";

export class Routes {
  routes: _Route[] = []

  constructor(public path: string){}

  newRoute(path: string, component: RouteInterfaces.Component_): Routes{
    const route = new _Route()
    route.path = `${this.path}/${path}`
    route.component = component
    this.routes.push(route)
    return this
  }
}

export class _Route implements AngularRoute{
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
  loadComponent?: RouteInterfaces.LoadComponent_;
}
