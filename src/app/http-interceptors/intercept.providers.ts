import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { SpinnerInterceptor } from "./spinner.interceptor";
import { TokenInterceptor } from "./token.interceptor";
import { UnauthorizedInterceptor } from "./unauthorizedinterceptor";

export const HttpInterceptProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
]