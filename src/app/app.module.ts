import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// added for data binding to work
import { FormsModule } from '@angular/forms';
// for Http
import {HttpClientModule} from '@angular/common/http';
// for modal, typeahead
import {ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
// routing support
import { RouterModule, Routes } from '@angular/router';
// animation for typeahead
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { PassDataComponent } from './pass-data/pass-data.component';
import {AuthService} from './services/auth.service';
import { PassCategoryComponent } from './pass-category/pass-category.component';
import {PassDataService} from './services/pass-data.service';
import {PassDataReaderService} from './services/pass-data-reader.service';
import { PassNoteComponent } from './pass-note/pass-note.component';
import { PassNoteViewComponent } from './pass-note-view/pass-note-view.component';
import { SearchComponent } from './search/search.component';
import { ExitComponent } from './exit/exit.component';
import { SearchNotesComponent } from './search-notes/search-notes.component';
import {PassDataRequiredGuard} from './guards/pass-data-required.guard';
import { PassDataFileInfoComponent } from './pass-data-file-info/pass-data-file-info.component';
import { PassDataFileNameComponent } from './pass-data-file-name/pass-data-file-name.component';
import {AppConfigModule} from './app-config/app-config.module';
import {DataSourceModule} from './data-source/data-source.module';
import {MessagesModule} from './messages/messages.module';
import { OperationControlComponent } from './operation-control/operation-control.component';

const appRoutes: Routes = [
  { path: 'password', component: PasswordComponent },
  { path: 'main',     component: PassDataComponent },
  {
    path: 'search/:text',
    component: SearchNotesComponent,
    canActivate: [PassDataRequiredGuard]
  },
  { path: '',
    redirectTo: '/password',
    pathMatch: 'full'
  },
  { path: '**', component: PasswordComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    PassDataComponent,
    PassDataFileInfoComponent,
    PassCategoryComponent,
    PassNoteComponent,
    PassNoteViewComponent,
    SearchComponent,
    ExitComponent,
    SearchNotesComponent,
    PassDataFileNameComponent,
    OperationControlComponent
  ],
  // modal component not directly referenced in templates
  entryComponents: [
    PassNoteViewComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true, useHash: true}
    ),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    // load configuration support
    AppConfigModule,
    // data source
    DataSourceModule,
    // messages
    MessagesModule
  ],
  providers: [
    AuthService,
    PassDataService,
    PassDataReaderService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
