import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ActivityService } from '../../../../../../app/data/services/activity/activity.service';

@Component({
  selector: 'app-delete-activity-dialog',
  templateUrl: './delete-activity-dialog.component.html',
  styleUrls: ['./delete-activity-dialog.component.scss']
})
export class DeleteActivityDialogComponent {
  activityId: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, 
    private activityService: ActivityService,
    private router: Router) {
      this.activityId = data;
    }

  delete() {
    this.activityService.deleteActivity(this.activityId)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.router.navigateByUrl('/jornadas');
        }
      })
  }
}
