import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { ActivityService } from '../../../../app/data/services/activity/activity.service';
import { UserData } from '../../../../app/data/interfaces/auth.interfaces';
import { SimpleActivity } from '../../../../app/data/interfaces/activity.interfaces';
import { PaginatedData } from "../../../data/interfaces/pagination.interface";
import { QueryParams } from '../../../../app/data/interfaces/queryParam.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData!: UserData;
  pagination!: Observable<PaginatedData>;
  activities: SimpleActivity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.pagination = this.activityService.getCommunityActivities(this.userData.comunidadAsignada);
    this.setActivities();
  }

  setActivities() {
    this.activityService.getCommunityActivities(this.userData.comunidadAsignada).subscribe({
      next: (resp) => {
        this.activities = [ ...resp.data ];
      }
    })
  }

  handlePageEvent(event: PageEvent) {
    let params: QueryParams[] = [
      {
        name: 'PageNumber',
        value: event.pageIndex + 1
      }
    ];
    this.activityService.getCommunityActivities(this.userData.comunidadAsignada, params).subscribe({
      next: (resp) => this.activities = [ ...resp.data ]
    })
  }
}
