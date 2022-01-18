import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExportViewComponent } from './export-view.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BsModalRef, ModalModule} from 'ngx-bootstrap';
import {PassDataService} from '../services/pass-data.service';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';

describe('ExportViewComponent', () => {
  let component: ExportViewComponent;
  let fixture: ComponentFixture<ExportViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportViewComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule
      ],
      providers: [
        BsModalRef,
        PassDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
