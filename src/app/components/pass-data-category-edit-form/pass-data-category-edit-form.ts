import {Component, Inject, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatInput, MatLabel} from "@angular/material/input";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {PassCategory} from '../../models/pass-data';
import {PassDataService} from '../../services/pass-data-service';
import {delay, of, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-pass-data-category-edit-form',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './pass-data-category-edit-form.html',
  styleUrl: './pass-data-category-edit-form.scss'
})
export class PassDataCategoryEditForm {
  fb = inject(FormBuilder)
  passDataService = inject(PassDataService);

  existingCategories = new Set<string>([])

  data$ = this.passDataService.getPassData().pipe(
    tap(v => {
      this.existingCategories = new Set(v?.categoryList.map(v => v.categoryName))
    })
  )

  existingNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.trim()
      if (!value) {
        return null;
      }

      const existing = this.existingCategories.has(value);
      return of(existing ? {existingName: {value}} : null).pipe(
        delay(0)
      );
    };
  }

  editForm = this.fb.group({
    categoryNameControl: ['', [
      Validators.required,
      Validators.minLength(2),
      ],
      this.existingNameValidator(),
    ],
  })

  constructor(
    private dialogRef: MatDialogRef<PassDataCategoryEditForm>,
    @Inject(MAT_DIALOG_DATA) private data?: PassCategory) {
    if (data) {
      this.editForm.patchValue({
        categoryNameControl: data.categoryName
      })
    }
  }

  onSave() {
    const newData = {...this.data, categoryName: this.editForm.value.categoryNameControl?.trim()};
    this.dialogRef.close(newData);
  }
}
