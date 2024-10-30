import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotesComponent } from './search-notes.component';
import {PasswordComponent} from '../password/password.component';
import {FormsModule} from '@angular/forms';
import {PassDataService} from '../services/pass-data.service';
import {PassDataComponent} from '../pass-data/pass-data.component';
import {PassNoteComponent} from '../pass-note/pass-note.component';
import {PassCategoryComponent} from '../pass-category/pass-category.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from '../services/auth.service';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';
import {PassData} from '../model/pass-data';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import {CopyValueComponent} from '../copy-value-panel/copy-value.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {DropDownFilterComponent} from '../drop-down-filter/drop-down-filter.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CopyUserNamePasswordPanelComponent} from '../copy-user-name-password-panel/copy-user-name-password-panel.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {RouterModule} from "@angular/router";

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SearchNotesComponent, PasswordComponent, PassDataComponent, PassCategoryComponent, PassNoteComponent,
        EditPanelComponent,
        CopyValueComponent,
        DropDownFilterComponent,
        CopyUserNamePasswordPanelComponent
    ],
    imports: [FormsModule,
        BrowserAnimationsModule,
        // https://github.com/jasmine/jasmine/issues/1523
      RouterModule. forRoot([
            { path: 'password', component: PasswordComponent },
            { path: 'main', component: PassDataComponent }
        ]),
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule,
        PaginationModule,
        PopoverModule,
        BsDropdownModule],
    providers: [
        AuthService,
        { provide: BsModalService, useClass: MockModalService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    service = TestBed.inject(PassDataService);
    service.setPassData(passData);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
