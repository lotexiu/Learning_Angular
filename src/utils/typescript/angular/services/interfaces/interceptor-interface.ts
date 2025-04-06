import { HttpRequest } from "@angular/common/http"


type ServiceInterceptor = (req: HttpRequest<unknown>) => HttpRequest<unknown>

interface ServiceObjInterceptor {
  [path: string]: ServiceInterceptor
}

export {
  ServiceInterceptor,
  ServiceObjInterceptor,
}