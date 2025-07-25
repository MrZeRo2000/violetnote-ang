import {inject, Injectable} from '@angular/core';
import {DataSource} from './data-source';

@Injectable({
  providedIn: 'root'
})
export class PassDataFileService {
  private dataSource = inject(DataSource);

}
