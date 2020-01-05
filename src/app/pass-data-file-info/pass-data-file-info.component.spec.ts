import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataFileInfoComponent } from './pass-data-file-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PassDataFileInfoComponent', () => {
  let component: PassDataFileInfoComponent;
  let fixture: ComponentFixture<PassDataFileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDataFileInfoComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDataFileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
