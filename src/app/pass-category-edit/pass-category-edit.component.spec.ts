import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassCategoryEditComponent } from './pass-category-edit.component';
import {BsModalRef, ModalModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

describe('PassCategoryEditComponent', () => {
  let component: PassCategoryEditComponent;
  let fixture: ComponentFixture<PassCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassCategoryEditComponent ],
      imports: [ReactiveFormsModule],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
