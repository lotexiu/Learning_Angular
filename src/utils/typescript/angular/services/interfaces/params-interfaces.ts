import { HttpClient } from "@angular/common/http";
import { GetTypeFromKey, KeyOf } from "@ts-natives/object/interfaces/object-interfaces";


type HttpClientKeys = KeyOf<HttpClient>;
type HttpClientKeyType<T extends HttpClientKeys> = GetTypeFromKey<HttpClient, T>;
type HttpClientFunctionArgs<T extends HttpClientKeys> = Parameters<HttpClientKeyType<T>>;

type DeleteParam  = HttpClientKeyType<'delete' >
type GetParam     = HttpClientKeyType<'get'    >
type HeadParam    = HttpClientKeyType<'head'   >
type JsonpParam   = HttpClientKeyType<'jsonp'  >
type OptionsParam = HttpClientKeyType<'options'>
type PatchParam   = HttpClientKeyType<'patch'  >
type PostParam    = HttpClientKeyType<'post'   >
type PutParam     = HttpClientKeyType<'put'    >
type RequestParam = HttpClientKeyType<'request'>

type SuccessRequest<T=any, R=void> = (response: T)=> R;
type CatchRequest<T=any, R=void> = (response: T)=> R;
type FinallyRequest<R=void> = ()=> void;

export {
  HttpClientFunctionArgs, HttpClientKeyType, HttpClientKeys,
  DeleteParam, GetParam,
  HeadParam, JsonpParam,
  OptionsParam,
  PatchParam,
  PostParam,
  PutParam,
  RequestParam,
  SuccessRequest,
  CatchRequest,
  FinallyRequest,
};
