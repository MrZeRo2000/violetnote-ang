import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ModalModule, PaginationComponent, PaginationConfig} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import { PassNoteComponent } from './pass-note.component';
import {PassDataService} from '../services/pass-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from '../services/auth.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

describe('PassNoteComponent', () => {
  let component: PassNoteComponent;
  let fixture: ComponentFixture<PassNoteComponent>;
  let service: PassDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassNoteComponent, PaginationComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ModalModule.forRoot(),
        DragDropModule,
        DataSourceModule,
        AppConfigModule
      ],
      providers: [
        {provide: PaginationConfig, useValue: {
          boundaryLinks: true,
            firstText: 'First',
            previousText: '&lsaquo;',
            nextText: '&rsaquo;',
            lastText: 'Last',
            maxSize: 1 }
        },
        AuthService
      ]
    })
    .compileComponents();
    service = TestBed.inject(PassDataService);
    service.setPassData({
      passCategoryList: [{categoryName: 'TestCategoryName'}],
      passNoteList: [{passCategory: {categoryName: 'TestCategoryName'}, user: 'TestUser', system: 'TestSystem'}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
