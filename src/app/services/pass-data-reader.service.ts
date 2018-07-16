import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassDataReaderService {

  constructor(private http: HttpClient) { }

  public getPassDataJSON(password: String) {
    // return this.http.get('assets/data.json').subscribe((data: any) => data);
    return this.http.get('assets/error.json1');
  }
}
