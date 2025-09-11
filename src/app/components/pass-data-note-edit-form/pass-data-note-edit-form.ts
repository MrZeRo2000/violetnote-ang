import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormBuilder, Validators} from '@angular/forms';
import {PassDataService} from '../../services/pass-data-service';

@Component({
  selector: 'app-pass-data-note-edit-form',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './pass-data-note-edit-form.html',
  styleUrl: './pass-data-note-edit-form.scss'
})
export class PassDataNoteEditForm {
  fb = inject(FormBuilder)
  passDataService = inject(PassDataService);

  editForm = this.fb.group({
    systemControl: ['', [Validators.required, Validators.minLength(2),]]
  })

  onSave(): void {

  }

}
