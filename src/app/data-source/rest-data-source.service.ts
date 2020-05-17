import {Inject, Injectable} from '@angular/core';
import {RestUrl} from '../app-config/app-config.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestDataSourceService {
  restUrl: string;

  constructor(private http: HttpClient, @Inject(RestUrl) restUrl: string) {
    this.restUrl = restUrl;
  }

  postResponse(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<any>> {
    return this.http.post(this.restUrl + resourceName, body, { headers, observe: 'response', params: httpParams });
  }
}
