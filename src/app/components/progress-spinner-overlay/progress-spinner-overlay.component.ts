import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-progress-spinner-overlay',
    templateUrl: './progress-spinner-overlay.component.html',
    styleUrl: './progress-spinner-overlay.component.css',
  imports: [
    MatProgressSpinnerModule,
  ]
})
export class ProgressSpinnerOverlayComponent {

}
