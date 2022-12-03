import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-title',
  templateUrl: './navigation-title.component.html',
  styleUrls: ['./navigation-title.component.scss']
})
export class NavigationTitleComponent {
  @Input() title: string = '';
  @Input() path: string = 'jornadas';

}
