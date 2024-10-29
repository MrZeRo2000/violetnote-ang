import {Injectable, InjectionToken} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppEnvConfig} from '../model/app-env-config';
import {environment} from '../../environments/environment';

export const RestUrl = new InjectionToken<string>('rest-url');

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private envConfig: AppEnvConfig = null;
  private configError: string = null;

  getConfigError(): string {
    return this.configError || (this.envConfig && !this.envConfig.restUrl && 'Rest configuration failure');
  }

  getRestUrl(): string {
    return this.envConfig?.restUrl;
  }

  constructor(private http: HttpClient) { }

  configEnv(): Promise<any> {
    console.log('loading configuration from ' + environment.envUrl);

    return this.http.get<AppEnvConfig>(environment.envUrl)
      .toPromise()
      .then(v => {this.envConfig = v; console.log('configuration:' + JSON.stringify(this.envConfig)); })
      .catch(reason => {this.configError = reason.message; console.log('rejected:' + this.configError); })
    ;
  }
}
