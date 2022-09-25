import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'actividades', component: ActivitiesComponent },
      { path: 'nueva-actividad', component: NewActivityComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
