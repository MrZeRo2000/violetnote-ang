import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
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

  onConfirmClick() {
    this.submitted = true;

    if (this.editForm.valid) {
      const resultItem = new PassCategory(this.editForm.value.name);

      this.bsModalRef.hide();
      this.result.next(resultItem);
    }
  }

}
