import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotesComponent } from './search-notes.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PasswordComponent} from '../password/password.component';
import {FormsModule} from '@angular/forms';
import {PassDataService} from '../services/pass-data.service';
import {PassDataComponent} from '../pass-data/pass-data.component';
import {PassNoteComponent} from '../pass-note/pass-note.component';
import {PassCategoryComponent} from '../pass-category/pass-category.component';
import {BsModalService, PaginationComponent} from 'ngx-bootstrap';
import {Injectable} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from '../services/auth.service';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';
import {PassData} from '../model/pass-data';

// https://github.com/jasmine/jasmine/issues/1523
/*
// looks not needed
RouterTestingModule.withRoutes([
  { path: 'password', component: PasswordComponent }
]);
*/

class MockModalService {
  public hide(): void { }
}

describe('SearchNotesComponent', () => {
  let component: SearchNotesComponent;
  let fixture: ComponentFixture<SearchNotesComponent>;
  let service: PassDataService;

  const passCategory = new PassCategory('TestCategoryName');
  passCategory.noteList = [
    new PassNote('system', 'user', 'password', 'url', 'info')
  ];

  const passData = new PassData(null);
  passData.categoryList = [passCategory];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNotesComponent, PasswordComponent, PassDataComponent, PassCategoryComponent, PassNoteComponent,
        EditPanelComponent,
        PaginationComponent ],
      imports: [
        FormsModule,
        // https://github.com/jasmine/jasmine/issues/1523
        RouterTestingModule.withRoutes([
          { path: 'password', component: PasswordComponent },
          { path: 'main', component: PassDataComponent}
        ]),
        HttpClientTestingModule,
        DataSourceModule,
        AppConfigModule
      ],
      providers: [
        AuthService,
        {provide: BsModalService, useClass: MockModalService}
      ]
    })
    .compileComponents();
    service = TestBed.inject(PassDataService);
    service.setPassData(passData);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
