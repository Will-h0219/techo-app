import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { NewActivityBody, SimpleActivity } from '../../interfaces/activity.interfaces';
import { UserData } from '../../interfaces/auth.interfaces';
import { DetailedActivityInfo } from '../../interfaces/detailedActivity.interfaces';
import { PaginatedData } from '../../interfaces/pagination.interface';
import { QueryParams } from '../../interfaces/queryParam.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl: string = environment.apiBase;
  
  constructor(private http: HttpClient) { }

  getVolunteerActivities(volunteerId: number): Observable<PaginatedData> {
    const url = `${this.baseUrl}/api/actividades/por-voluntario/${volunteerId}`;
    return this.http.get<PaginatedData>(url);
  }

  getCommunityActivities(comunidadId: number, queryParams?: QueryParams[]): Observable<PaginatedData> {
    const url = `${this.baseUrl}/api/actividades/por-comunidad/${comunidadId}`;
    if (!!queryParams) {
      let params = new HttpParams();
      queryParams.forEach((param) => {
        params = params.append(param.name, param.value);
      });
      return this.http.get<PaginatedData>(url, { params });
    }
    return this.http.get<PaginatedData>(url);
  }

  newActivity(body: NewActivityBody): Observable<any> {
    const url = `${this.baseUrl}/api/actividades`;
    return this.http.post<any>(url, body);
  }

  getDetailedActivity(actividadId: string, workbench: string): Observable<DetailedActivityInfo> {
    const url = `${this.baseUrl}/api/actividades/detalle`;
    const params = new HttpParams()
                        .append('actividadId', actividadId)
                        .append('esMesaTrabajo', workbench);
    return this.http.get<DetailedActivityInfo>(url, { params });
  }

  deleteActivity(activityId: string): Observable<any> {
    const url = `${this.baseUrl}/api/actividades/${activityId}`;
    return this.http.delete(url);
  }

  updateActivity(activityId: string | number, targetId: string | number, data: NewActivityBody) {
    const url = `${this.baseUrl}/api/actividades/${activityId}/editar/${targetId}`;
    return this.http.put(url, data);
  }
}
