import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataNoteEditForm } from './pass-data-note-edit-form';

describe('PassDataNoteEditForm', () => {
  let component: PassDataNoteEditForm;
  let fixture: ComponentFixture<PassDataNoteEditForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataNoteEditForm]
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
