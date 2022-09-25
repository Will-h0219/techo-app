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


@NgModule({
  declarations: [
    PagesLayoutComponent,
    DashboardComponent,
    ActivitiesComponent,
    NewActivityComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    PagesLayoutComponent,
    DashboardComponent,
    ActivitiesComponent
  ]
})
export class PagesModule { }
