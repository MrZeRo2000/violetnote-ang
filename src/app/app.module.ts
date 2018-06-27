import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// added for data binding to work
import { FormsModule } from '@angular/forms';
// for Http
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import {PassDataService} from './pass-data.service';
import { PassDataComponent } from './pass-data/pass-data.component';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent,
    PassDataComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [
    AuthService,
    PassDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
