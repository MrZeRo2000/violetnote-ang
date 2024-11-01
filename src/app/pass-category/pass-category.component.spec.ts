import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { PassCategoryComponent } from './pass-category.component';
import {PassDataService} from '../services/pass-data.service';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PassCategoryComponent', () => {
  let component: PassCategoryComponent;
  let fixture: ComponentFixture<PassCategoryComponent>;
  let service: PassDataService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PassCategoryComponent, EditPanelComponent],
    imports: [FormsModule,
        DragDropModule,
        ModalModule.forRoot(),
        DataSourceModule,
        AppConfigModule,
        FontAwesomeIconsModule],
    providers: [
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    service = TestBed.inject(PassDataService);
    service.setPassData({
      categoryList: [{categoryName: 'TestCategoryName', noteList: [{user: 'TestUser', system: 'TestSystem'}]}]
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
