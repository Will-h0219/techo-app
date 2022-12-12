import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap, tap } from 'rxjs';

import { VolunteerService } from '../../../../../app/data/services/volunteer/volunteer.service';
import { CommunityService } from '../../../../../app/data/services/community/community.service';
import { UserData } from '../../../../../app/data/interfaces/auth.interfaces';
import { CommunityInfo } from '../../../../../app/data/interfaces/community.interfaces';
import { VolunteerItem, VolunteerPerCommunity } from '../../../../../app/data/interfaces/volunteer.interfaces';
import { ActivityFormValue } from '../../../../../app/data/interfaces/activityForm.interfaces';
import { DetailedActivityInfo } from '../../../../../app/data/interfaces/detailedActivity.interfaces';

@Component({
  selector: 'app-new-activity-form',
  templateUrl: './new-activity-form.component.html',
  styleUrls: ['./new-activity-form.component.scss']
})
export class NewActivityFormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<ActivityFormValue> = new EventEmitter();
  @Input() editValue: DetailedActivityInfo | null = null;

  userData!: UserData;
  communities: CommunityInfo[] = [];
  volunteers: VolunteerPerCommunity[] = [];

  activityForm: FormGroup = this.fb.group({
    comunidadId: [null, [Validators.required]],
    fechaJornada: [null, [Validators.required]],
    esMesaTrabajo: [null, [Validators.required]],
    numeroHabitantes: [null, [Validators.required]],

    mesaTrabajo: this.fb.group({
      temasTratados: [null, [Validators.required]],
      compromisos: [null, [Validators.required]],
      linkActa: [null],
    }),

    actividadAlternativa: this.fb.group({
      actividadesRealizadas: [null, [Validators.required]],
      descripcionActividad: [null, [Validators.required]]
    }),

    voluntariosIds: [null, [Validators.required]]
  });

  get controls() {
    return this.activityForm.controls;
  }

  constructor(private communityService: CommunityService,
    private volunteerService: VolunteerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.setCommunities();
    this.setVolunteers();
    this.workbenchChanges();
    this.controls['comunidadId'].setValue(this.userData.comunidadAsignada);
    this.controls['mesaTrabajo'].disable();
    this.controls['actividadAlternativa'].disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['editValue'].currentValue) { return }

    const { comunidadId, fechaJornada, esMesaTrabajo, habitantesParticipantes, asistentes } = changes['editValue'].currentValue.generalidades;
    const voluntariosIds: number[] = [];
    asistentes.forEach((x: VolunteerItem) => voluntariosIds.push(x.id));
    this.activityForm.patchValue({
      comunidadId,
      fechaJornada,
      esMesaTrabajo,
      numeroHabitantes: habitantesParticipantes,
      voluntariosIds
    });

    if (changes['editValue'].currentValue.generalidades.esMesaTrabajo) {
      const { temasTratados, compromisos, linkActa } = changes['editValue'].currentValue;
      this.activityForm.get('mesaTrabajo')?.patchValue({
        temasTratados,
        compromisos,
        linkActa
      });
    } else {
      const { nombre, descripcion } = changes['editValue'].currentValue;
      this.activityForm.get('actividadAlternativa')?.patchValue({
        actividadesRealizadas: nombre,
        descripcionActividad: descripcion
      })
    }
  }

  setCommunities() {
    this.communityService.getCommunities().subscribe({
      next: (resp) => this.communities = resp
    });
  }

  setVolunteers() {
    this.controls['comunidadId'].valueChanges.pipe(
      filter((value) => value !== null),
      tap(() => this.snackBar.dismiss()),
      switchMap((value) => this.volunteerService.volunteerPerCommunity(value))
    )
    .subscribe({
      next: (resp) => {
        if (!resp[0].voluntarios.length) {
          let community = this.communities.find(x => x.id === this.controls['comunidadId'].value);
          this.snackBar.open(`No hay voluntarios registrados o activos en ${community?.nombre}. Comunicate con soporte.`, "Ok");
        }
        this.volunteers = resp
      }
    });
  }

  workbenchChanges() {
    this.controls['esMesaTrabajo'].valueChanges.pipe(
      tap(() => {
        this.activityForm.get('mesaTrabajo')?.disable();
        this.activityForm.get('actividadAlternativa')?.disable();
      }),
      filter((value) => value !== null)
    )
    .subscribe({
      next: (value) => {
        if (value) {
          this.activityForm.get('mesaTrabajo')?.enable();
          this.activityForm.get('actividadAlternativa')?.disable();
        } else {
          this.activityForm.get('actividadAlternativa')?.enable();
          this.activityForm.get('mesaTrabajo')?.disable();
        }
      }
    });
  }

  submit() {
    let today = new Date();
    let date = new Date(this.controls['fechaJornada'].value);
    if (date > today) {
      this.snackBar.open('La fecha no puede ser mayor a la de hoy', 'OK', {
        duration: 4000
      });
      return;
    }
    const value: ActivityFormValue = this.activityForm.value;
    if (!!this.editValue) { value.editTargetId = this.editValue.id }

    this.onSubmit.emit(value);
    this.activityForm.reset();
    this.controls['comunidadId'].setValue(this.userData.comunidadAsignada);
  }

}
