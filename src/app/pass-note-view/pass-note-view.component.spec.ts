import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNoteViewComponent } from './pass-note-view.component';
import {AccordionModule} from 'ngx-bootstrap';

describe('PassNoteViewComponent', () => {
  let component: PassNoteViewComponent;
  let fixture: ComponentFixture<PassNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteViewComponent ],
      imports: [AccordionModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
