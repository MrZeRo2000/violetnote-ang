import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// added for data binding to work
import { FormsModule } from '@angular/forms';
// for Http
import {HttpClientModule} from '@angular/common/http';
// for modal
import {ModalModule} from 'ngx-bootstrap';
// routing support
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { PassDataComponent } from './pass-data/pass-data.component';
import {AuthService} from './auth.service';
import { PassCategoryComponent } from './pass-category/pass-category.component';
import {PassDataService} from './pass-data.service';
import {PassDataReaderService} from './pass-data-reader.service';
import { PassNoteComponent } from './pass-note/pass-note.component';
import { PassNoteViewComponent } from './pass-note-view/pass-note-view.component';
import { SearchComponent } from './search/search.component';
import { ExitComponent } from './exit/exit.component';

const appRoutes: Routes = [
  { path: 'password', component: PasswordComponent },
  { path: 'main',      component: PassDataComponent },
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
    PassCategoryComponent,
    PassNoteComponent,
    PassNoteViewComponent,
    SearchComponent,
    ExitComponent
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
      {enableTracing: true}
    )
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
