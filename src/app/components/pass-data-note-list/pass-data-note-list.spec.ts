import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataNoteList } from './pass-data-note-list';

describe('PassDataNoteList', () => {
  let component: PassDataNoteList;
  let fixture: ComponentFixture<PassDataNoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataNoteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataNoteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
