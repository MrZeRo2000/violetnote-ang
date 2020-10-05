import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationControlComponent } from './operation-control.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {ModalModule} from 'ngx-bootstrap';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';

describe('OperationControlComponent', () => {
  let component: OperationControlComponent;
  let fixture: ComponentFixture<OperationControlComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ OperationControlComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ModalModule.forRoot(),
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
