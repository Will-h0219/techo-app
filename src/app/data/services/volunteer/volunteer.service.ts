import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { VolunteerItem } from '../../interfaces/volunteer.interfaces';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private baseUrl: string = environment.apiBase;
  
  constructor(private http: HttpClient) { }

  public volunteerCatalogue(): Observable<VolunteerItem[]> {
    const url = `${this.baseUrl}/api/catalogo/voluntarios`;
    return this.http.get<VolunteerItem[]>(url);
  }
}
