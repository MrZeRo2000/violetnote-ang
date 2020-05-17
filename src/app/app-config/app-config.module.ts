import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppConfigService} from './app-config.service';
import { AppConfigErrorComponent } from './app-config-error/app-config-error.component';
import {FormsModule} from '@angular/forms';

export function configApp(appConfigService: AppConfigService) {
  return () => appConfigService.configEnv();
}

@NgModule({
  declarations: [AppConfigErrorComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    AppConfigErrorComponent
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: configApp, deps: [AppConfigService], multi: true}
  ]
})
export class AppConfigModule { }
