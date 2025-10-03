import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataNoteViewForm } from './pass-data-note-view-form';

describe('PassDataNoteViewForm', () => {
  let component: PassDataNoteViewForm;
  let fixture: ComponentFixture<PassDataNoteViewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataNoteViewForm]
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
