import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationControlComponent } from './operation-control.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';

describe('OperationControlComponent', () => {
  let component: OperationControlComponent;
  let fixture: ComponentFixture<OperationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationControlComponent ],
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
    fixture = TestBed.createComponent(OperationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
