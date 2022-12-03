import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NewActivityFormComponent } from './components/new-activity-form/new-activity-form.component';
import { ActivityAddedDialogComponent } from './components/dialogs/activity-added-dialog/activity-added-dialog.component';
import { NavigationTitleComponent } from './components/navigation-title/navigation-title.component';
import { VolunteerListComponent } from './components/volunteer-list/volunteer-list.component';
import { DeleteActivityDialogComponent } from './components/dialogs/delete-activity-dialog/delete-activity-dialog.component';
import { PagesLayoutComponent } from './pages/pages-layout/pages-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewActivityComponent } from './pages/new-activity/new-activity.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { ActivitiesRoutingModule } from './activities-routing.module';


@NgModule({
  declarations: [
    PagesLayoutComponent,
    DashboardComponent,
    NewActivityComponent,
    ActivityCardComponent,
    NewActivityFormComponent,
    ActivityAddedDialogComponent,
    ActivityComponent,
    NavigationTitleComponent,
    VolunteerListComponent,
    DeleteActivityDialogComponent,
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    SharedModule
  ],
  exports: [
    PagesLayoutComponent,
    DashboardComponent,
  ]
})
export class ActivitiesModule { }
