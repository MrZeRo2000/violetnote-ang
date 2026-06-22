import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PassDataCategoryEditForm } from './pass-data-category-edit-form';

describe('PassDataCategoryEditForm', () => {
  let component: PassDataCategoryEditForm;
  let fixture: ComponentFixture<PassDataCategoryEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataCategoryEditForm],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
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
