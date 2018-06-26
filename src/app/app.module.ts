import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// added for data binding to work
import { FormsModule } from '@angular/forms';
// for Http
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import {PassDataService} from './pass-data.service';

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [
    PassDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
