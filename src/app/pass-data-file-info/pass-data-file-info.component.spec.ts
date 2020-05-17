import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataFileInfoComponent } from './pass-data-file-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('PassDataFileInfoComponent', () => {
  let component: PassDataFileInfoComponent;
  let fixture: ComponentFixture<PassDataFileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassDataFileInfoComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
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
