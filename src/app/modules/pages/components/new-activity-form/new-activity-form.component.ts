import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { VolunteerService } from '../../../../../app/data/services/volunteer/volunteer.service';
import { CommunityService } from '../../../../../app/data/services/community/community.service';
import { UserData } from '../../../../../app/data/interfaces/auth.interfaces';
import { CommunityInfo } from '../../../../../app/data/interfaces/community.interfaces';
import { VolunteerPerCommunity } from '../../../../../app/data/interfaces/volunteer.interfaces';
import { ActivityFormValue } from '../../../../../app/data/interfaces/activityForm.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-activity-form',
  templateUrl: './new-activity-form.component.html',
  styleUrls: ['./new-activity-form.component.scss']
})
export class NewActivityFormComponent implements OnInit {
  
  @Output() onSubmit: EventEmitter<ActivityFormValue> = new EventEmitter();

  userData!: UserData;
  communities: CommunityInfo[] = [];
  volunteers: VolunteerPerCommunity[] = [];

  activityForm: FormGroup = this.fb.group({
    comunidadId: [null, [Validators.required]],
    fechaJornada: [null, [Validators.required]],
    esMesaTrabajo: [null, [Validators.required]],

    mesaTrabajo: this.fb.group({
      temasTratados: [null, [Validators.required]],
      compromisos: [null, [Validators.required]],
      numeroHabitantes: [null, [Validators.required]],
      linkActa: [null],
    }),

    actividadAlternativa: this.fb.group({
      actividadesRealizadas: [null, [Validators.required]],
      descripcionActividad: [null, [Validators.required]]
    }),

    voluntariosIds: [{value: null, disabled: true}, [Validators.required]]
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

  setCommunities() {
    this.communityService.getCommunities().subscribe({
      next: (resp) => this.communities = resp
    });
  }

  setVolunteers() {
    this.controls['comunidadId'].valueChanges.pipe(
      filter((value) => value !== null),
      switchMap((value) => this.volunteerService.volunteerPerCommunity(value))
    )
    .subscribe({
      next: (resp) => this.volunteers = resp
    });
  }

  workbenchChanges() {
    this.controls['esMesaTrabajo'].valueChanges.pipe(
      tap(() => {
        this.activityForm.get('mesaTrabajo')?.disable();
        this.activityForm.get('actividadAlternativa')?.disable();
        this.controls['voluntariosIds'].disable();
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
        this.controls['voluntariosIds'].enable();
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
    this.onSubmit.emit(this.activityForm.value);
    this.activityForm.reset();
    this.controls['comunidadId'].setValue(this.userData.comunidadAsignada);
  }

}