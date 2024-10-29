import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {MessagesModule} from '../messages/messages.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {AppConfigModule} from '../app-config/app-config.module';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PasswordComponent],
    imports: [FormsModule,
        RouterTestingModule,
        DataSourceModule,
        MessagesModule,
        AppConfigModule,
        FontAwesomeIconsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
