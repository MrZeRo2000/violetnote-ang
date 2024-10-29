import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExportViewComponent } from './export-view.component';
import {FormsModule} from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {PassDataService} from '../services/pass-data.service';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ExportViewComponent', () => {
  let component: ExportViewComponent;
  let fixture: ComponentFixture<ExportViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ExportViewComponent],
    imports: [FormsModule,
        DataSourceModule,
        AppConfigModule],
    providers: [
        BsModalRef,
        PassDataService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
