import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {MessagesModule} from '../messages/messages.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppConfigModule} from '../app-config/app-config.module';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        DataSourceModule,
        MessagesModule,
        AppConfigModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
