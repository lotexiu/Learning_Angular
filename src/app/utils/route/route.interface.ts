import { EnvironmentProviders, Provider, Type } from "@angular/core";
import { Data, DefaultExport, LoadChildrenCallback, Resolve, ResolveData, ResolveFn, Routes, RunGuardsAndResolvers, UrlMatcher } from "@angular/router";
import { Observable } from "rxjs";

type CanActivate_ = any[] | undefined;
type CanActivateChild_ = any[] | undefined;
type CanDeactivate_ = any[] | undefined;
type CanMatch_ = any[] | undefined;
type Children_ = Routes | undefined;
type Component_ = Type<any> | undefined;
type Data_ = Data | undefined;
type LoadChildren_ = LoadChildrenCallback | undefined;
type Matcher_ = UrlMatcher | undefined;
type Outlet_ = string | undefined;
type Path_ = string | undefined;
type PathMatch_ = "prefix" | "full" | undefined;
type Providers_ = (Provider | EnvironmentProviders)[] | undefined;
type RedirectTo_ = string | undefined;
type Resolve_ = ResolveData | undefined;
type RunGuardsAndResolvers_ = RunGuardsAndResolvers | undefined;
type Title_ = string | Type<Resolve<string>> | ResolveFn<string> | undefined;  
type LoadComponent_ =  (() => 
  Type<unknown> | 
  Observable<Type<unknown> | 
  DefaultExport<Type<unknown>>> | 
  Promise<Type<unknown> | 
  DefaultExport<Type<unknown>>>
) | undefined;

export {
  CanActivate_,
  CanActivateChild_,
  CanDeactivate_,
  CanMatch_,
  Children_,
  Component_,
  Data_,
  LoadChildren_,
  Matcher_,
  Outlet_,
  Path_,
  PathMatch_,
  Providers_,
  RedirectTo_,
  Resolve_,
  RunGuardsAndResolvers_,
  Title_,
  LoadComponent_,
}