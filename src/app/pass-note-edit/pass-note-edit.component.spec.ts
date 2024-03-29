import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PassNoteEditComponent } from './pass-note-edit.component';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {ReactiveFormsModule} from '@angular/forms';

describe('PassNoteEditComponent', () => {
  let component: PassNoteEditComponent;
  let fixture: ComponentFixture<PassNoteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassNoteEditComponent ],
      imports: [ReactiveFormsModule, TypeaheadModule.forRoot()],
      providers: [BsModalRef]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
