import { Route as AngularRoute } from "@angular/router";
import { RouteData } from "./route-utils";
import * as RouteI from "./interfaces/route.interface";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { isNull } from "@ts-natives/object/object-utils";

/**
 * Classe responsável por gerenciar as rotas da aplicação
 */
class Routes {
  private readonly children: Routes[] = [];
  private _fullPath!: string;

  constructor(
    public readonly path: string,
    public readonly title: string = '',
    public readonly component: Nullable<RouteI.Component_> = null
  ) {
    this.fullPath = path;
    RouteData.createdRoutes.push(this);
  }

  /**
   * Define o caminho completo da rota e atualiza os filhos
   */
  set fullPath(path: string) {
    this._fullPath = path;
    this.updateChildrenPaths();
  }

  get fullPath(): string {
    return this._fullPath;
  }

  /**
   * Atualiza recursivamente o caminho completo dos filhos
   */
  private updateChildrenPaths(): void {
    this.children.forEach(childRoute => {
      childRoute.fullPath = `${this._fullPath}/${childRoute.path}`;
    });
  }

  /**
   * Converte a rota atual para o formato do Angular
   */
  toRoute(): AngularRouteExtended {
    const angularRoute = new AngularRouteExtended();

    if (!isNull(this.component)) {
      angularRoute.component = this.component;
    }

    angularRoute.path = this.path;
    angularRoute.title = `${localStorage['title']} (${this.title})`;
    angularRoute.subTitle = this.title;
    angularRoute.children = this.children.map(
      (childRoute: Routes): AngularRouteExtended => childRoute.toRoute()
    );

    return angularRoute;
  }

  /**
   * Adiciona rotas filhas à rota atual
   * @param childRoutes Array de rotas filhas ou configurações de rota
   */
  addChildrens(...childRoutes: RouteI.AddChildren): Routes {
    childRoutes.forEach((childRoute: Routes | RouteI.MinimalRoute) => {
      if (Array.isArray(childRoute)) {
        const [path, title, component] = childRoute;
        const newRoute = new Routes(path, title, component);
        newRoute.fullPath = `${this.fullPath}/${newRoute.path}`;
        this.children.push(newRoute);
      } else {
        childRoute.fullPath = `${this.fullPath}/${childRoute.path}`;
        this.children.push(childRoute);
      }
    });
    return this;
  }
}

/**
 * Extensão da interface Route do Angular com propriedades adicionais
 */
class AngularRouteExtended implements AngularRoute {
  canActivate?: RouteI.CanActivate_;
  canActivateChild?: RouteI.CanActivateChild_;
  canDeactivate?: RouteI.CanDeactivate_;
  canMatch?: RouteI.CanMatch_;
  children?: RouteI.Children_;
  component?: RouteI.Component_;
  data?: RouteI.Data_;
  loadChildren?: RouteI.LoadChildren_;
  matcher?: RouteI.Matcher_;
  outlet?: RouteI.Outlet_;
  path?: RouteI.Path_;
  pathMatch?: RouteI.PathMatch_;
  providers?: RouteI.Providers_;
  redirectTo?: RouteI.RedirectTo_;
  resolve?: RouteI.Resolve_;
  runGuardsAndResolvers?: RouteI.RunGuardsAndResolvers_;
  title?: RouteI.Title_;
  subTitle?: string;
  loadComponent?: RouteI.LoadComponent_;
}

export { Routes, AngularRouteExtended as _Route };

