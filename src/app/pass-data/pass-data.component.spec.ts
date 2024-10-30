import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassDataComponent } from './pass-data.component';
import {PassCategoryComponent} from '../pass-category/pass-category.component';
import {PassNoteComponent} from '../pass-note/pass-note.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {DataSourceModule} from '../data-source/data-source.module';
import {AppConfigModule} from '../app-config/app-config.module';
import {EditPanelComponent} from '../edit-panel/edit-panel.component';
import {FontAwesomeIconsModule} from '../font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {RouterModule} from "@angular/router";

describe('PassDataComponent', () => {
  let component: PassDataComponent;
  let fixture: ComponentFixture<PassDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PassDataComponent, PassCategoryComponent, PassNoteComponent, EditPanelComponent],
    imports: [FormsModule,
        RouterModule. forRoot(
          [{path: '', component: PassDataComponent}, {path: 'simple', component: PassDataComponent}]
        ),
        DataSourceModule,
        AppConfigModule,
        PaginationModule,
        FontAwesomeIconsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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

