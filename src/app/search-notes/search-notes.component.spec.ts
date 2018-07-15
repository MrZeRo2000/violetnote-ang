import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotesComponent } from './search-notes.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PasswordComponent} from '../password/password.component';
import {FormsModule} from '@angular/forms';
import {PassDataService} from '../services/pass-data.service';
import {PassDataComponent} from '../pass-data/pass-data.component';
import {PassNoteComponent} from '../pass-note/pass-note.component';
import {PassCategoryComponent} from '../pass-category/pass-category.component';
import {BsModalService} from 'ngx-bootstrap';

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

class MockPassDataService extends PassDataService {
  constructor() {
    super();
    this.setPassData({
      passCategoryList: [{categoryName: 'TestCategoryName'}],
      passNoteList: [{
        passCategory: {categoryName: 'TestCategoryName'},
        system: 'System',
        user: 'User',
        custom: 'Custom'
      }]
    });
  }
}

describe('SearchNotesComponent', () => {
  let component: SearchNotesComponent;
  let fixture: ComponentFixture<SearchNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNotesComponent, PasswordComponent, PassDataComponent, PassCategoryComponent, PassNoteComponent ],
      imports: [
        FormsModule,
        // https://github.com/jasmine/jasmine/issues/1523
        RouterTestingModule.withRoutes([
          { path: 'password', component: PasswordComponent },
          { path: 'main', component: PassDataComponent}
        ])
      ],
      providers: [
        {provide: BsModalService, useClass: MockModalService},
        {provide: PassDataService, useClass: MockPassDataService}
      ]
    })
    .compileComponents();
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
