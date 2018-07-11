import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotesComponent } from './search-notes.component';
import {RouterTestingModule} from '@angular/router/testing';
import {PasswordComponent} from '../password/password.component';
import {FormsModule} from '@angular/forms';

// https://github.com/jasmine/jasmine/issues/1523
/*
// looks not needed
RouterTestingModule.withRoutes([
  { path: 'password', component: PasswordComponent }
]);
*/

describe('SearchNotesComponent', () => {
  let component: SearchNotesComponent;
  let fixture: ComponentFixture<SearchNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNotesComponent, PasswordComponent ],
      imports: [
        FormsModule,
        // https://github.com/jasmine/jasmine/issues/1523
        RouterTestingModule.withRoutes([
          { path: 'password', component: PasswordComponent }
        ])
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
