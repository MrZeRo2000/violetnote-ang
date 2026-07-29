import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-progress-spinner-overlay',
    templateUrl: './progress-spinner-overlay.component.html',
    styleUrl: './progress-spinner-overlay.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatProgressSpinnerModule,
  ]
})
export class ProgressSpinnerOverlayComponent {

}
