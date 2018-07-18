import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassDataReaderService {

  constructor(private http: HttpClient) { }

  public getPassDataJSON(password: string) {
    if (environment.production) {
      return this.http.post(
        environment.passDataUrl,
        {password: password});
    } else {
      return this.http.get(environment.passDataUrl, {params: {password: password}});
    }
  }
}
