import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PassDataComponent } from './pass-data.component';
import {PassCategoryComponent} from '../pass-category/pass-category.component';
import {PassNoteComponent} from '../pass-note/pass-note.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {PaginationComponent} from 'ngx-bootstrap/pagination';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';

describe('PassDataComponent', () => {
  let component: PassDataComponent;
  let fixture: ComponentFixture<PassDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassDataComponent, PassCategoryComponent, PassNoteComponent, PaginationComponent, EditPanelComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

