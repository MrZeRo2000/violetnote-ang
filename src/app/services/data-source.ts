import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSource {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getResponseData<T>(resourceName: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${resourceName}`, {params});
  }

  getResponse<T>(resourceName: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(`${this.apiUrl}${resourceName}`, { observe: 'response', params });
  }

  postResponse<T>(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.post<T>(`${this.apiUrl}${resourceName}`, body, { headers, observe: 'response', params: httpParams });
  }

  postResponseData<T>(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${resourceName}`, body);
  }

  putResponseData<T>(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${resourceName}`, body);
  }

  deleteResponseData<T>(resourceName: string, id: number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${resourceName}/${id}`);
  }
}
