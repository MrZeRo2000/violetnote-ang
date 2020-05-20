import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitComponent } from './exit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';

describe('ExitComponent', () => {
  let component: ExitComponent;
  let fixture: ComponentFixture<ExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
