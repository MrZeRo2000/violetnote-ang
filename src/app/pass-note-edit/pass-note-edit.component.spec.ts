import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNoteEditComponent } from './pass-note-edit.component';
import {BsModalRef, TypeaheadModule} from 'ngx-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';

describe('PassNoteEditComponent', () => {
  let component: PassNoteEditComponent;
  let fixture: ComponentFixture<PassNoteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteEditComponent ],
      imports: [ReactiveFormsModule, TypeaheadModule.forRoot()],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
