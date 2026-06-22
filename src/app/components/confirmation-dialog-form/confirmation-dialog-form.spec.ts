import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmationDialogForm } from './confirmation-dialog-form';

describe('ConfirmationDialogForm', () => {
  let component: ConfirmationDialogForm;
  let fixture: ComponentFixture<ConfirmationDialogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDialogForm],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MAT_DIALOG_DATA, useValue: { contentTemplate: null, contentContext: {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
