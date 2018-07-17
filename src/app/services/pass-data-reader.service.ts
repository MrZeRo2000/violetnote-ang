import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassDataReaderService {

  constructor(private http: HttpClient) { }

  public getPassDataJSON(password: string) {
    // return this.http.get('assets/data.json').subscribe((data: any) => data);
    return this.http.get(environment.passDataUrl, {params: {password: password}});
  }
}
