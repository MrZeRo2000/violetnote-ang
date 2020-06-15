import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { PassCategoryComponent } from './pass-category.component';
import {PassDataService} from '../services/pass-data.service';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {ModalModule} from 'ngx-bootstrap';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';

describe('PassCategoryComponent', () => {
  let component: PassCategoryComponent;
  let fixture: ComponentFixture<PassCategoryComponent>;
  let service: PassDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassCategoryComponent, EditPanelComponent ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        DragDropModule,
        ModalModule.forRoot(),
        DataSourceModule,
        AppConfigModule
      ],
      providers: [
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
    fixture = TestBed.createComponent(PassCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
