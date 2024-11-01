import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {AppConfigService, RestUrl} from './app-config.service';
import { AppConfigErrorComponent } from './app-config-error/app-config-error.component';

export function configAppFactory(appConfigService: AppConfigService) {
  return () => appConfigService.configEnv();
}

export function restUrlFactory(appConfigService: AppConfigService) {
  return appConfigService.getRestUrl();
}

@NgModule({ declarations: [AppConfigErrorComponent],
    exports: [
        AppConfigErrorComponent
    ], imports: [CommonModule], providers: [
        { provide: APP_INITIALIZER, useFactory: configAppFactory, deps: [AppConfigService], multi: true },
        { provide: RestUrl, useFactory: restUrlFactory, deps: [AppConfigService], multi: false },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppConfigModule { }
