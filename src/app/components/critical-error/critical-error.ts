import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-critical-error',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatIcon
  ],
  templateUrl: './critical-error.html',
  styleUrl: './critical-error.scss',
})
export class CriticalError {
  @Input()
  errorMessage: string | undefined;
}
