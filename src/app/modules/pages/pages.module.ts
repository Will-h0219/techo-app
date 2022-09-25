import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivitiesComponent } from './activities/activities.component';
import { RouterModule } from '@angular/router';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesLayoutComponent,
    DashboardComponent,
    ActivitiesComponent,
    NewActivityComponent,
    ActivityCardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    SharedModule
  ],
  exports: [
    PagesLayoutComponent,
    DashboardComponent,
    ActivitiesComponent
  ]
})
export class PagesModule { }
