import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CommunityInfo } from '../../interfaces/community.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private baseUrl: string = environment.apiBase;

  constructor(private http: HttpClient) { }

  getCommunities(): Observable<CommunityInfo[]> {
    const url = `${this.baseUrl}/api/catalogo/comunidades`;
    return this.http.get<CommunityInfo[]>(url);
  }
}
