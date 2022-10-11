import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleActivity } from '../../../../../app/data/interfaces/activity.interfaces';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent {

  @Input() activity!: SimpleActivity;
  @Input() coordinador: boolean = false;

  checkMesaTrabajo(fueMesaTrabajo: boolean) {
    return fueMesaTrabajo ? 'Sí' : 'No';
  }

}
