import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { PassDataNoteViewForm } from './pass-data-note-view-form';

describe('PassDataNoteViewForm', () => {
  let component: PassDataNoteViewForm;
  let fixture: ComponentFixture<PassDataNoteViewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataNoteViewForm],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataNoteViewForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
