import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNoteComponent } from './pass-note.component';
import {AccordionModule} from 'ngx-bootstrap';

describe('PassNoteComponent', () => {
  let component: PassNoteComponent;
  let fixture: ComponentFixture<PassNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteComponent ],
      imports: [AccordionModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
