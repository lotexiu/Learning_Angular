import { Route as AngularRoute } from "@angular/router"
import { ArrayType } from "src/utils/interfaces/array-interfaces"
import { InstanceType } from "src/utils/interfaces/function-interfaces"
import { Nullable } from "src/utils/interfaces/misc-interfaces"

type ArrayChildren = [
  path: string,
  title: string,
  component: any
]
type Children = ArrayType<[AngularRoute|ArrayChildren], true>

export interface RouteReturn extends AngularRoute {
  addChildrens: (...routes: Children)=> RouteReturn
  icon?: string
  logo?: string
  parent: ()=> Nullable<RouteReturn>
  children: Array<RouteReturn>

  [key: string]: any
}

class Route {
  private static addChildrens(father:any, ...routes: Children): RouteReturn {
    father.children = routes.map((route: Route | Children): Route => {
      if (route instanceof Array) {
        return (this.new as any)(...route)
      }
      return route
    })

    father.children.forEach((child: RouteReturn): void => {
      child.parent = () => father
    })
    return father
  }

  static new(path: string, title?: string, component?: any): RouteReturn {
    let croute: RouteReturn = {
      path,
      title,
      component,
      children: [],
      parent: ()=> {},
      addChildrens: (...routes: Children)=> {
        return this.addChildrens(croute, ...routes)
      }
    }
    return croute
  }
}

export {
  Route
}