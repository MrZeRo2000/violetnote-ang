import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SearchComponent} from './search/search.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {AppConfigModule} from './app-config/app-config.module';
import {PassDataFileNameComponent} from './pass-data-file-name/pass-data-file-name.component';
import {DataSourceModule} from './data-source/data-source.module';
import {MessagesModule} from './messages/messages.module';
import {EditPanelComponent} from './edit-panel/edit-panel.component';
import {AppInfoComponent} from './app-info/app-info.component';
import {FontAwesomeIconsModule} from './font-awesome-icons/font-awesome-icons.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        AppComponent,
        PassDataFileNameComponent,
        EditPanelComponent,
        SearchComponent,
        AppInfoComponent
    ],
    imports: [FormsModule,
        RouterTestingModule,
        TypeaheadModule,
        DataSourceModule,
        AppConfigModule,
        MessagesModule,
        FontAwesomeIconsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'VioletNote'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('VioletNote');
  }));
  it('should render title in a h1 tag', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('VioletNote');
  }));
});
