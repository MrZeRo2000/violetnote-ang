import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {PassDataService} from '../../services/pass-data-service';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input'
import {PassNote} from '../../models/pass-data';

@Component({
  selector: 'app-pass-data-note-edit-form',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
  ],
  templateUrl: './pass-data-note-edit-form.html',
  styleUrl: './pass-data-note-edit-form.scss'
})
export class PassDataNoteEditForm {
  fb = inject(FormBuilder)
  passDataService = inject(PassDataService);

  editForm = this.fb.group({
    systemControl: ['', [Validators.required, this.minLengthTrimmedValidator(2),]]
  })

  minLengthTrimmedValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim()
      if (!value || (value.length >= minLength)) {
        return null;
      }
      console.log('Validator returning error')
      return {'minLength': value.length};
    };
  }

  constructor(@Inject(MAT_DIALOG_DATA) private data?: PassNote) {
    if (data) {
      this.editForm.patchValue({
        systemControl: data.system
      })
    }
  }

  onSave(): void {

  }

}
