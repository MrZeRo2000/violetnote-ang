import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataFileNameComponent } from './pass-data-file-name.component';
import {FormsModule} from '@angular/forms';

describe('PassDataFileNameComponent', () => {
  let component: PassDataFileNameComponent;
  let fixture: ComponentFixture<PassDataFileNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDataFileNameComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDataFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
