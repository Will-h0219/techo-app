import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, tap } from 'rxjs';

import { ActivityService } from '../../../../../app/data/services/activity/activity.service';
import { UserData } from '../../../../../app/data/interfaces/auth.interfaces';
import { PaginatedData } from '../../../../../app/data/interfaces/pagination.interface';
import { QueryParams } from '../../../../../app/data/interfaces/queryParam.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData!: UserData;

  pagination!: PaginatedData;
  result$!: Observable<PaginatedData>;

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.result$ = this.activityService.getCommunityActivities(this.userData.comunidadAsignada).pipe(
      tap(resp => this.pagination = resp)
    );
  }

  handlePageEvent(event: PageEvent) {
    let params: QueryParams[] = [
      {
        name: 'PageNumber',
        value: event.pageIndex + 1
      }
    ];
    this.result$ = this.activityService.getCommunityActivities(this.userData.comunidadAsignada, params);
  }
}
