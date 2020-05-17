import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RestDataSourceService} from './rest-data-source.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RestDataSourceService
  ]
})
export class DataSourceModule { }
