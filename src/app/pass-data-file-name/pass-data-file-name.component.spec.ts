import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataFileNameComponent } from './pass-data-file-name.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';

describe('PassDataFileNameComponent', () => {
  let component: PassDataFileNameComponent;
  let fixture: ComponentFixture<PassDataFileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassDataFileNameComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDataFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
