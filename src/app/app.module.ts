import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// added for data binding to work
import { FormsModule } from '@angular/forms';
// for Http
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { PassDataComponent } from './pass-data/pass-data.component';
import {AuthService} from './auth.service';
import { PassCategoryComponent } from './pass-category/pass-category.component';
import {PassDataService} from './pass-data.service';
import {PassDataReaderService} from './pass-data-reader.service';

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    PassDataComponent,
    PassCategoryComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [
    AuthService,
    PassDataService,
    PassDataReaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
