import { Component, Input, OnInit } from '@angular/core';
import { SimpleActivity } from '../../../../../app/data/interfaces/activity.interfaces';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss']
})
export class ActivityCardComponent implements OnInit {

  @Input() activity!: SimpleActivity;
  @Input() coordinador: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  checkMesaTrabajo(fueMesaTrabajo: boolean) {
    return fueMesaTrabajo ? 'Sí' : 'No';
  }

}
