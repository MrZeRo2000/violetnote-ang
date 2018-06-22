import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// added for data binding to work
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
