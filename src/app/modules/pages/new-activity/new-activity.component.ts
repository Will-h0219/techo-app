import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs';

import { CommunityInfo } from '../../../data/interfaces/community.interfaces';
import { VolunteerItem } from '../../../data/interfaces/volunteer.interfaces';
import { VolunteerService } from '../../../data/services/volunteer/volunteer.service';
import { CommunityService } from '../../../data/services/community/community.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.scss']
})
export class NewActivityComponent implements OnInit {

  communities: CommunityInfo[] = [];
  volunteers: VolunteerItem[] = [];

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
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activityForm.get('mesaTrabajo')?.disable();
    this.activityForm.get('actividadAlternativa')?.disable();
    this.setCommunities();
    this.setVolunteers();
    this.workbenchChanges();
  }
  
  setCommunities() {
    this.communityService.getCommunities().subscribe({
      next: (res) => this.communities = res
    });
  }

  setVolunteers() {
    this.volunteerService.volunteerCatalogue().subscribe({
      next: (res) => this.volunteers = res
    })
  }
  
  workbenchChanges() {
    this.activityForm.controls['esMesaTrabajo'].valueChanges.pipe(
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

  validField(control: AbstractControl) {
    console.log(control)
  }

  submit() {
    let date = this.activityForm.controls['fechaJornada'].value;
    if (!date) { date = new Date(); }
    this.activityForm.controls['fechaJornada'].setValue(new Date(date).toISOString());
    console.log(this.activityForm.value);
    this.activityForm.reset();
  }

}
