import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { LoginBody, LoginResponse } from '../../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiBase;

  constructor(private http: HttpClient) { }

  tokenExists(): Observable<boolean> {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    return of( !!userData && !!userData.token )
  }

  login(body: LoginBody): Observable<LoginResponse> {
    const url = `${this.baseUrl}/api/auth/login`;
    return this.http.post<LoginResponse>(url, body);
  }
}
