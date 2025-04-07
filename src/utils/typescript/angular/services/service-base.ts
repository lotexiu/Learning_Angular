import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Nullable } from "@ts-interfaces/misc-interfaces";
import { isNull } from "@ts-natives/object/object-utils";
import { Subject, Observable, takeUntil, lastValueFrom } from "rxjs";
import { ServiceObjInterceptor } from "./interfaces/interceptor-interface";
import { SuccessRequest, CatchRequest, FinallyRequest, HttpClientFunctionArgs, HttpClientKeys } from "./interfaces/params-interfaces";




@Injectable({
  providedIn: 'root'
})
export class ServiceBase {
  constructor(
    protected http: HttpClient
  ) {
    this.ngOnInit();
  }

  successRequest?: SuccessRequest
  catchRequest?: CatchRequest
  finallyRequest?: FinallyRequest
  
  static interceptors: ServiceObjInterceptor = {}

  static newCancel(): Subject<void> {
    return new Subject<void>();
  }

  ngOnInit(): void {}

  delete<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'delete'>): Promise<R>
  delete<R=any>(...args: HttpClientFunctionArgs<'delete'>): Promise<R>;
  delete<R=any>(...args: any): Promise<R> {
    return this.handleRequest('delete', ...args);
  }
  
  get<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'get'>): Promise<R>
  get<R=any>(...args: HttpClientFunctionArgs<'get'>): Promise<R>;
  get<R=any>(...args: any): Promise<R> {
    return this.handleRequest('get', ...args);
  }

  post<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'post'>): Promise<R>
  post<R=any>(...args: HttpClientFunctionArgs<'post'>): Promise<R>;
  post<R=any>(...args: any): Promise<R> {
    return this.handleRequest('post', ...args);
  }

  put<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'put'>): Promise<R>
  put<R=any>(...args: HttpClientFunctionArgs<'put'>): Promise<R>;
  put<R=any>(...args: any): Promise<R> {
    return this.handleRequest('put', ...args);
  }

  head<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'head'>): Promise<R>
  head<R=any>(...args: HttpClientFunctionArgs<'head'>): Promise<R>;
  head<R=any>(...args: any): Promise<R> {
    return this.handleRequest('head', ...args);
  }

  jsonp<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'jsonp'>): Promise<R>
  jsonp<R=any>(...args: HttpClientFunctionArgs<'jsonp'>): Promise<R>;
  jsonp<R=any>(...args: any): Promise<R> {
    return this.handleRequest('jsonp', ...args);
  }

  options<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'options'>): Promise<R>
  options<R=any>(...args: HttpClientFunctionArgs<'options'>): Promise<R>;
  options<R=any>(...args: any): Promise<R> {
    return this.handleRequest('options', ...args);
  }

  patch<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'patch'>): Promise<R>
  patch<R=any>(...args: HttpClientFunctionArgs<'patch'>): Promise<R>;
  patch<R=any>(...args: any): Promise<R> {
    return this.handleRequest('patch', ...args);
  }

  request<R=any>(reqCancel: Nullable<Subject<any>>, ...args: HttpClientFunctionArgs<'request'>): Promise<R>
  request<R=any>(...args: HttpClientFunctionArgs<'request'>): Promise<R>;
  request<R=any>(...args: any): Promise<R> {
    return this.handleRequest('request', ...args);
  }

  private handleRequest<T extends HttpClientKeys, R>(type: T, ...args: any[]): Promise<R> {
    let [reqCancel, ...rest] = args;
    if (!isNull(reqCancel) && !(reqCancel instanceof Subject)) {
      reqCancel = null
      rest = args;
    }
    return (this.doRequest as any)(type, reqCancel, ...rest);
  }

  private doRequest<T extends HttpClientKeys, R=any>(
    type: T, 
    reqCancel: Nullable<Subject<any>>,
    ...Args: HttpClientFunctionArgs<T>
  ): Promise<Nullable<R>> {
    const obsResult: Observable<any> = (this.http[type] as any)(...Args);
    const observable: Observable<any> = reqCancel ? obsResult.pipe(takeUntil(reqCancel)) : obsResult;
    return lastValueFrom(observable)
    .then((response: any): Promise<R> => this.successRequest?.(response) ?? response)
    .catch((error: any): void | Promise<never> => this.catchRequest ? this.catchRequest(error) : Promise.reject(error))
    .finally((): void => this.finallyRequest?.());
  }
}