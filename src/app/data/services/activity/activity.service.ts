import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl: string = environment.apiBase;
  
  constructor(private http: HttpClient) { }
}
