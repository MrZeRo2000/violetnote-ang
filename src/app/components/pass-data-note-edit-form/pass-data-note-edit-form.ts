import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
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

  onSave(): void {

  }

}
