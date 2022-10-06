import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { NewActivityBody, SimpleActivity } from '../../interfaces/activity.interfaces';
import { UserData } from '../../interfaces/auth.interfaces';
import { PaginatedData } from '../../interfaces/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl: string = environment.apiBase;
  
  constructor(private http: HttpClient) { }

  getActivities(volunteerId: number): Observable<PaginatedData> {
    const url = `${this.baseUrl}/api/actividades/${volunteerId}`;
    return this.http.get<PaginatedData>(url);
  }

  newActivity(body: NewActivityBody): Observable<any> {
    const url = `${this.baseUrl}/api/actividades`;
    return this.http.post<any>(url, body);
  }
}
