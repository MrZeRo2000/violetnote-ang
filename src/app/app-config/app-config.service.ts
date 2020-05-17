import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppEnvConfig} from '../model/app-env-config';

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
    return this.envConfig.restUrl;
  }

  constructor(private http: HttpClient) { }

  configEnv(): Promise<any> {
    const result = this.http.get<AppEnvConfig>('assets/env.json')
      .toPromise()
      .then(v => {this.envConfig = v; console.log(this.envConfig); })
      .catch(reason => {this.configError = reason.message; console.log('rejected:' + this.configError);})
    ;
    return result;
  }
}
