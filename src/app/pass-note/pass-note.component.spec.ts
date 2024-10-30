import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ModalModule} from 'ngx-bootstrap/modal';
import {PaginationConfig, PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import { PassNoteComponent } from './pass-note.component';
import {PassDataService} from '../services/pass-data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {AuthService} from '../services/auth.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';
import {PassCategory} from '../model/pass-category';
import {PassNote} from '../model/pass-note';
import {PassData} from '../model/pass-data';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import {CopyUserNamePasswordPanelComponent} from '../copy-user-name-password-panel/copy-user-name-password-panel.component';
import {PopoverModule} from 'ngx-bootstrap/popover';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PassNoteComponent', () => {
  let component: PassNoteComponent;
  let fixture: ComponentFixture<PassNoteComponent>;
  let service: PassDataService;

  const passCategory = new PassCategory('TestCategoryName');
  passCategory.noteList = [
    new PassNote('system', 'user', 'password', 'url', 'info')
  ];

  const passData = new PassData(null);
  passData.categoryList = [passCategory];
  passData.calcNoteList();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PassNoteComponent, EditPanelComponent, CopyUserNamePasswordPanelComponent],
    imports: [FormsModule,
        ModalModule.forRoot(),
        PaginationModule,
        DragDropModule,
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule,
        PopoverModule],
    providers: [
        { provide: PaginationConfig, useValue: {
                boundaryLinks: true,
                firstText: 'First',
                previousText: '&lsaquo;',
                nextText: '&rsaquo;',
                lastText: 'Last',
                maxSize: 1
            }
        },
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    service = TestBed.inject(PassDataService);
    service.setPassData(passData);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
