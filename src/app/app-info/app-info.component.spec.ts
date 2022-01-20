import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInfoComponent } from './app-info.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppConfigModule} from '../app-config/app-config.module';

describe('AppInfoComponent', () => {
  let component: AppInfoComponent;
  let fixture: ComponentFixture<AppInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppInfoComponent ],
      imports: [
        HttpClientTestingModule,
        AppConfigModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
