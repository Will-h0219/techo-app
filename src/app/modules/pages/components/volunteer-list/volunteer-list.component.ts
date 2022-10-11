import { Component, Input, OnInit } from '@angular/core';
import { VolunteerItem } from 'src/app/data/interfaces/volunteer.interfaces';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit {

  @Input() title: string = 'Voluntarios';
  @Input() attendees: VolunteerItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
