import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataCategoryEditForm } from './pass-data-category-edit-form';

describe('PassDataCategoryEditForm', () => {
  let component: PassDataCategoryEditForm;
  let fixture: ComponentFixture<PassDataCategoryEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataCategoryEditForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataCategoryEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
