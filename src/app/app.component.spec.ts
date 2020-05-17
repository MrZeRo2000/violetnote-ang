import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ExitComponent} from './exit/exit.component';
import {SearchComponent} from './search/search.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TypeaheadModule} from 'ngx-bootstrap';
import {PassDataFileInfoComponent} from './pass-data-file-info/pass-data-file-info.component';
import {AppConfigModule} from './app-config/app-config.module';
import {PassDataFileNameComponent} from './pass-data-file-name/pass-data-file-name.component';
import {DataSourceModule} from './data-source/data-source.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PassDataFileInfoComponent,
        PassDataFileNameComponent,
        ExitComponent,
        SearchComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TypeaheadModule,
        DataSourceModule,
        AppConfigModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'VioletNote'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('VioletNote');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('VioletNote');
  }));
});
