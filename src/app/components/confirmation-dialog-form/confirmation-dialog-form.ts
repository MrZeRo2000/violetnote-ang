import {Component, Inject, TemplateRef} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog-form',
  imports: [
    MatDialogModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    NgTemplateOutlet
  ],
  templateUrl: './confirmation-dialog-form.html',
  styleUrl: './confirmation-dialog-form.scss'
})
export class ConfirmationDialogForm {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {contentTemplate: TemplateRef<any>, contentContext: any}) { }
}
