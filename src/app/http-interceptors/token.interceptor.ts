import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserData } from "../data/interfaces/auth.interfaces";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authApi: string = environment.authApi;

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