import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressSpinnerModule,
  ],
  templateUrl: './loader.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loader.scss'
})
export class Loader {

}
