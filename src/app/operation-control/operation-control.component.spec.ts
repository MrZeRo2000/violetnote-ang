import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationControlComponent } from './operation-control.component';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('OperationControlComponent', () => {
  let component: OperationControlComponent;
  let fixture: ComponentFixture<OperationControlComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
    declarations: [OperationControlComponent],
    imports: [RouterTestingModule,
        ModalModule.forRoot(),
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
