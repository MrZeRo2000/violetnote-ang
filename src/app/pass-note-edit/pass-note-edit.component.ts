import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-pass-note-edit',
  templateUrl: './pass-note-edit.component.html',
  styleUrls: ['./pass-note-edit.component.scss']
})
export class PassNoteEditComponent implements OnInit {
  item: PassNote;
  duplicateItem: PassNote;
  items: Array<PassNote>;
  passCategory: PassCategory;
  result: Subject<PassNote>;

  confirmButtonText: string;

  editForm: FormGroup;
  submitted = false;

  constructor(public bsModalRef: BsModalRef) { }

  static getOptionalStringValue(value: string): string {
    if (value && value.trim()) {
      return value.trim();
    } else {
      return null;
    }
  }

  ngOnInit(): void {
    this.confirmButtonText = !!this.item ? 'Save' : 'Create';

    this.editForm = new FormGroup({
      system:
        new FormControl((this.item && this.item.system) || (this.duplicateItem && this.duplicateItem.system), Validators.required),
      user:
        new FormControl((this.item && this.item.user) || (this.duplicateItem && this.duplicateItem.user), Validators.required),
      password:
        new FormControl((this.item && this.item.password) || (this.duplicateItem && this.duplicateItem.password), Validators.required),
      passwordRetype:
        new FormControl((this.item && this.item.password) || (this.duplicateItem && this.duplicateItem.password), Validators.required),
      comments:
        new FormControl((this.item && this.item.comments) || (this.duplicateItem && this.duplicateItem.comments)),
      custom: new FormControl((this.item && this.item.custom) || (this.duplicateItem && this.duplicateItem.custom)),
      info: new FormControl((this.item && this.item.info) || (this.duplicateItem && this.duplicateItem.info))
    });

    this.editForm.valueChanges.subscribe(value => {
      if (this.submitted) {
        this.submitted = false;

        this.editForm.controls.user.markAsTouched();
        this.editForm.controls.user.updateValueAndValidity();

        this.editForm.controls.password.markAsTouched();
        this.editForm.controls.password.updateValueAndValidity();
      }
    });
  }

  onConfirmClick() {
    this.submitted = true;

    if (this.item) {
      this.validateSave();
    } else {
      this.validateCreate();
    }

    if (this.editForm.valid) {
      const resultItem = new PassNote(
        this.passCategory,
        this.editForm.controls.system.value,
        this.editForm.controls.user.value,
        this.editForm.controls.password.value,
        PassNoteEditComponent.getOptionalStringValue(this.editForm.controls.comments.value),
        PassNoteEditComponent.getOptionalStringValue(this.editForm.controls.custom.value),
        PassNoteEditComponent.getOptionalStringValue(this.editForm.controls.info.value)
      );

      this.bsModalRef.hide();
      this.result.next(resultItem);
    }
  }

  private validateCreate(): void {
    this.validatePasswordRetype();

    const userDuplicates = this.items.filter(
      (v) => v.system === this.editForm.controls.system.value && v.user === this.editForm.controls.user.value
    );
    if (userDuplicates.length > 0) {
      this.editForm.controls.user.setErrors({existingUser: true});
    }
  }

  private validateSave(): void {
    this.validatePasswordRetype();

    const userDuplicates = this.items.filter(
      (v) =>
        v.system === this.editForm.controls.system.value && v.user === this.editForm.controls.user.value &&
        (this.editForm.controls.system.value !== this.item.system || this.editForm.controls.user.value !== this.item.user)
    );
    if (userDuplicates.length > 0) {
      this.editForm.controls.user.setErrors({existingUser: true});
    }
  }

  private validatePasswordRetype(): void {
    if (this.editForm.controls.password.value !== this.editForm.controls.passwordRetype.value) {
      this.editForm.controls.password.setErrors({passwordRetypeMismatch: true});
    }
  }

}
