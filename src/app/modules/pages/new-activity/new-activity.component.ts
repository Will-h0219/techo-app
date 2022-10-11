import { Component, OnInit } from '@angular/core';

import { ActivityService } from '../../../../app/data/services/activity/activity.service';
import { UserData } from '../../../../app/data/interfaces/auth.interfaces';
import { ActivityFormValue } from '../../../../app/data/interfaces/activityForm.interfaces';
import { NewActivityBody } from '../../../../app/data/interfaces/activity.interfaces';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivityAddedDialogComponent } from '../components/dialogs/activity-added-dialog/activity-added-dialog.component';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {

  userData!: UserData;

  constructor(private activityService: ActivityService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
  }

  submit(formValue: ActivityFormValue) {
    let body = this.createNewActivityBody(formValue);

    this.activityService.newActivity(body).subscribe({
      next: (resp) => {
        console.log(resp);
        this.dialog.open(ActivityAddedDialogComponent);
      }
    });
  }

  createNewActivityBody(formValue: ActivityFormValue) {
    let date = formValue.fechaJornada;

    const body: NewActivityBody = {
      comunidadId: formValue.comunidadId,
      voluntarioId: this.userData.voluntarioId,
      esMesaTrabajo: formValue.esMesaTrabajo,
      fechaJornada: !date ? new Date().toISOString() : new Date(date).toISOString(),
      habitantesParticipantes: formValue.numeroHabitantes,
      voluntariosIds: formValue.voluntariosIds
    };

    if (body.esMesaTrabajo) {
      body.mesaTrabajo = {
        compromisos: formValue.mesaTrabajo!.compromisos,
        temasTratados: formValue.mesaTrabajo!.temasTratados,
      }
      if (!!formValue.mesaTrabajo!.linkActa) {
        body.mesaTrabajo.linkActa = formValue.mesaTrabajo!.linkActa;
      }
    } else {
        body.actividadAlternativa = {
          nombre: formValue.actividadAlternativa!.actividadesRealizadas,
          descripcion: formValue.actividadAlternativa!.descripcionActividad
        }
    }

    return body;
  }
}
