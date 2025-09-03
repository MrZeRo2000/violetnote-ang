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
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {PassCategory} from '../../models/pass-data';

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
  ],
  templateUrl: './pass-data-category-edit-form.html',
  styleUrl: './pass-data-category-edit-form.scss'
})
export class PassDataCategoryEditForm {
  fb = inject(FormBuilder)

  editForm = this.fb.group({
    categoryNameControl: ['', [Validators.required, Validators.minLength(2)]],
  })


  constructor(
    private dialogRef: MatDialogRef<PassDataCategoryEditForm>,
    @Inject(MAT_DIALOG_DATA) private data: PassCategory) {
    this.editForm.patchValue({
      categoryNameControl: data.categoryName
    })
  }

  onSave() {
    const newData = {...this.data, categoryName: this.editForm.value.categoryNameControl};
    this.dialogRef.close(newData);
  }
}
