import { Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {PassCategory} from '../model/pass-category';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pass-category-edit',
  templateUrl: './pass-category-edit.component.html',
  styleUrls: ['./pass-category-edit.component.scss']
})
export class PassCategoryEditComponent implements OnInit {
  item: PassCategory;
  items: Array<PassCategory>;
  result: Subject<PassCategory>;

  confirmButtonText: string;

  editForm: FormGroup;
  submitted = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmButtonText = !!this.item ? 'Save' : 'Create';
    this.editForm = new FormGroup({
      name: new FormControl(this.item && this.item.categoryName, Validators.required)
    });
  }

  private validateCreate(): void {
    const nameDuplicates = this.items.filter(
      (v) => v.categoryName === this.editForm.controls.name.value
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
  }

  private validateSave(): void {
    const nameDuplicates = this.items.filter(
      (v) =>
        v.categoryName === this.editForm.controls.name.value && this.editForm.controls.name.value !== this.item.categoryName
    );
    if (nameDuplicates.length > 0) {
      this.editForm.controls.name.setErrors({existingName: true});
    }
  }

  onConfirmClick() {
    this.submitted = true;

    if (this.item) {
      this.validateSave();
    } else {
      this.validateCreate();
    }

    if (this.editForm.valid) {
      const resultItem = new PassCategory(this.editForm.value.name);

      this.bsModalRef.hide();
      this.result.next(resultItem);
    }
  }

}
