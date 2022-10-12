import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { UnauthorizedDialogComponent } from './dialogs/unauthorized-dialog/unauthorized-dialog.component';
import { NotificationDialogComponent } from './dialogs/notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    SidenavComponent,
    SpinnerComponent,
    UnauthorizedDialogComponent,
    NotificationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    SidenavComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
