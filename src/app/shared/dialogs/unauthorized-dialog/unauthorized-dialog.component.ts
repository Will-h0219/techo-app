import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../../../app/data/interfaces/dialogs.interfaces';

@Component({
  selector: 'app-unauthorized-dialog',
  templateUrl: './unauthorized-dialog.component.html',
  styleUrls: ['./unauthorized-dialog.component.scss']
})
export class UnauthorizedDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
