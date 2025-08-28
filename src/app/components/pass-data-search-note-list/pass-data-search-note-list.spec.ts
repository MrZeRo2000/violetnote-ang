import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataSearchNoteList } from './pass-data-search-note-list';

describe('PassDataSearchNoteList', () => {
  let component: PassDataSearchNoteList;
  let fixture: ComponentFixture<PassDataSearchNoteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassDataSearchNoteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassDataSearchNoteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
