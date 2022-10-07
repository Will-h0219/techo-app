import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserData } from "../data/interfaces/auth.interfaces";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authApi: string = environment.authApi;

  private tokenExpirado: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJkYXZpZC5jYXJyaWxsb0B0ZWNoby5vcmciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJjb29yZGluYWRvciB6b25hbCIsImVzQWRtaW4iOiIxIiwiZXhwIjoxNjY0OTM3OTM1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjM5ODI0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozOTgyNCJ9.yVDLN3h2MYwEiX7wwKrSYwvHClh0SS23S28WsRSMy70';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(this.authApi)) {
      let userData: UserData = JSON.parse(localStorage.getItem('userData')!);

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.token}`
      });

      const reqClone = req.clone({
        headers
      });

      return next.handle(reqClone);
    }

    return next.handle(req);
  }
}