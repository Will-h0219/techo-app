import { Component } from '@angular/core';

import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  showSpinner = this.spinnerService.isLoading;

  constructor(private spinnerService: SpinnerService) { }

}
