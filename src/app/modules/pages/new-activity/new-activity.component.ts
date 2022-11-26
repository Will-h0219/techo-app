import { Component, OnInit } from '@angular/core';

import { ActivityService } from '../../../../app/data/services/activity/activity.service';
import { UserData } from '../../../../app/data/interfaces/auth.interfaces';
import { ActivityFormValue } from '../../../../app/data/interfaces/activityForm.interfaces';
import { NewActivityBody } from '../../../../app/data/interfaces/activity.interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivityAddedDialogComponent } from '../components/dialogs/activity-added-dialog/activity-added-dialog.component';
import { filter, switchMap } from 'rxjs';
import { DetailedActivityInfo } from 'src/app/data/interfaces/detailedActivity.interfaces';
import { NotificationDialogComponent } from 'src/app/shared/dialogs/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {

  userData!: UserData;
  activityId: string = '';
  workbenchParam: string = '';
  activity: DetailedActivityInfo | null = null;

  constructor(private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.init();
  }

  init() {
    if (!this.router.url.includes('editar')) { return }

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => {
          this.activityId = id;
          return this.activatedRoute.queryParams.pipe(
            filter((param) => !!param['workbench'])
          )
        }),
        switchMap(({ workbench }) => {
          this.workbenchParam = workbench;
          return this.activityService.getDetailedActivity(this.activityId, workbench)
        })
      )
      .subscribe({
        next: (resp) => this.activity = resp
      })
  }

  submit(formValue: ActivityFormValue) {
    console.log(formValue)
    let body = this.createNewActivityBody(formValue);

    if (!!formValue.editTargetId) {
      this.activityService.updateActivity(this.activityId, formValue.editTargetId, body).subscribe({
        next: (resp) => {
          console.log(resp);
          const routeParam = `tablero/actividad/${this.activityId}`;
          const queryParam: Params = {
            workbench: this.workbenchParam
          };
          this.dialog.open(NotificationDialogComponent, {
            disableClose: true,
            data: {
              type: 'success',
              title: 'Listo!',
              content: 'Actividad actualizada.',
              routeParam,
              queryParam
            }
          })
        }
      })
    } else {
      this.activityService.newActivity(body).subscribe({
        next: (resp) => {
          console.log(resp);
          this.dialog.open(ActivityAddedDialogComponent, {
            disableClose: true
          });
        }
      });
    }

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
