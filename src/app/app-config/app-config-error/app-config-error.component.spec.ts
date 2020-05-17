import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfigErrorComponent } from './app-config-error.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppConfigErrorComponent', () => {
  let component: AppConfigErrorComponent;
  let fixture: ComponentFixture<AppConfigErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConfigErrorComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfigErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
