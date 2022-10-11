import { Component, OnInit } from '@angular/core';

import { ActivityService } from '../../../../app/data/services/activity/activity.service';
import { UserData } from '../../../../app/data/interfaces/auth.interfaces';
import { SimpleActivity } from '../../../../app/data/interfaces/activity.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData!: UserData;
  activities: SimpleActivity[] = [];

  constructor(private activityService: ActivityService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.setActivities();
  }

  setActivities() {
    this.activityService.getCommunityActivities(this.userData.comunidadAsignada).subscribe({
      next: (resp) => { this.activities = resp.data; console.log(resp) }
    })
  }
}
