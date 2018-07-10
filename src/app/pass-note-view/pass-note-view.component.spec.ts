import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNoteViewComponent } from './pass-note-view.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PassDataService} from '../pass-data.service';
import {Injectable} from '@angular/core';
import {PassCategory} from '../pass-category';
import {PassNote} from '../pass-note';

class MockModalService {
  public hide(): void { }
}

class MockPassNote {
  passCategory: PassCategory = {categoryName: 'TestCategoryName'};
  system: String = 'System';
  user: String = 'User';
  password: String = 'Password';
  comments: String = 'Comments';
  custom: String = 'Custom';
  info: String = 'Info';
}

describe('PassNoteViewComponent', () => {
  let component: PassNoteViewComponent;
  let fixture: ComponentFixture<PassNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteViewComponent ],
      providers: [
        {provide: BsModalRef, useClass: MockModalService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteViewComponent);
    component = fixture.componentInstance;
    component.passNote = new MockPassNote();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
