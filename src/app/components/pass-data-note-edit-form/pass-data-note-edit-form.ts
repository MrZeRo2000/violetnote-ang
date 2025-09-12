import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
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
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input'
import {PassNote} from '../../models/pass-data';
import {PassDataSelectionService} from '../../services/pass-data-selection-service';

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
  passDataSelectionService = inject(PassDataSelectionService);

  selectedCategory = this.passDataSelectionService.firstSelectedCategory()
  systemOptions = [... new Set(this.selectedCategory?.noteList.map(v => v.system))].sort()

  editForm = this.fb.group({
    systemControl: ['', [Validators.required, this.minLengthTrimmedValidator(2),]],
    userControl: ['', [Validators.required, this.existingUserValidator()]],
    passwordControl: ['', [Validators.required]],
    retypePasswordControl: ['', [Validators.required]],
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

  existingUserValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.editForm) {
        return null;
      }

      const value = control.value.trim()
      const systemValue = this.editForm.value.systemControl;
      if (!value || !systemValue) {
        return null;
      }

      const duplicates = this.selectedCategory?.noteList.filter(
        v => (v.system == systemValue) && (v.user = value) &&
          (v.system !== this.item?.system) && (v.user !== this.item?.user)
      ) || []

      return duplicates.length == 0 ? null : {'existing': true};
    };
  }

  constructor(private dialogRef: MatDialogRef<PassDataNoteEditForm>,
    @Inject(MAT_DIALOG_DATA) private item?: PassNote) {
    if (item) {
      this.editForm.patchValue({
        systemControl: item.system,
        userControl: item.user,
        passwordControl: item.password,
        retypePasswordControl: item.password,
      })
    }
  }

  onSave(): void {
    const newItem: PassNote = {
      ... this.item,
      system: this.editForm.value.systemControl!.trim(),
      user: this.editForm.value.userControl!.trim(),
      password: this.editForm.value.passwordControl!
    }
    this.dialogRef.close(newItem);
  }

}
