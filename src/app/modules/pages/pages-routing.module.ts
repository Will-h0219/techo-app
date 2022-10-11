import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'nueva-actividad', component: NewActivityComponent },
      { path: 'editar-actividad/:id', component: NewActivityComponent },
      { path: 'actividad/:id', component: ActivityComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
