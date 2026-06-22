import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PassDataNoteEditForm } from './pass-data-note-edit-form';

describe('PassDataNoteEditForm', () => {
  let component: PassDataNoteEditForm;
  let fixture: ComponentFixture<PassDataNoteEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataNoteEditForm],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataNoteEditForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
