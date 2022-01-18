import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PassCategoryEditComponent } from './pass-category-edit.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ReactiveFormsModule} from '@angular/forms';

describe('PassCategoryEditComponent', () => {
  let component: PassCategoryEditComponent;
  let fixture: ComponentFixture<PassCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassCategoryEditComponent ],
      imports: [ReactiveFormsModule],
      providers: [BsModalRef]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
