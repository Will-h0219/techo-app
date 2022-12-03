import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, switchMap } from 'rxjs';

import { ActivityService } from '../../../../../app/data/services/activity/activity.service';
import { UserData } from '../../../../../app/data/interfaces/auth.interfaces';
import { DetailedActivityInfo } from '../../../../../app/data/interfaces/detailedActivity.interfaces';
import { DeleteActivityDialogComponent } from '../../components/dialogs/delete-activity-dialog/delete-activity-dialog.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activityId: string = '';
  userData!: UserData;

  activity$!: Observable<DetailedActivityInfo>;

  constructor(private route: ActivatedRoute,
    private actividadService: ActivityService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.activity$ = this.getQueryParams();
  }

  getQueryParams() {
    return this.route.params.pipe(
      switchMap(({ id }) => {
        this.activityId = id;
        return this.route.queryParams.pipe(
          filter((param) => !!param['workbench'])
        );
      }),
      switchMap(({ workbench }) => this.actividadService.getDetailedActivity(this.activityId, workbench))
    )
  }

  openDeleteDialog() {
    this.dialog.open(DeleteActivityDialogComponent, {
      data: this.activityId
    });
  }
}
