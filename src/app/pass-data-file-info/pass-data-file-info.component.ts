import { Component, OnInit } from '@angular/core';
import {PassDataFileInfoService} from '../services/pass-data-file-info.service';
import {PassDataFileInfo} from '../model/pass-data-file-info';

@Component({
  selector: 'app-pass-data-file-info',
  templateUrl: './pass-data-file-info.component.html',
  styleUrls: ['./pass-data-file-info.component.scss']
})
export class PassDataFileInfoComponent implements OnInit {

  loadErrorMessage = null;
  passDataFileInfo: PassDataFileInfo = null;

  constructor(private passDataFileInfoService: PassDataFileInfoService) { }

  ngOnInit() {
    this.passDataFileInfo = this.passDataFileInfoService.getPassDataFileInfo();
    if (this.passDataFileInfo == null) {
      this.passDataFileInfoService.currentPassDataFileInfo.subscribe(data => {
        this.passDataFileInfo = data;
      });

      this.loadData();
    }
  }

  private loadData() {
    const o = this.passDataFileInfoService.getDataReader();
    o.subscribe((data: any) => {
      if (data.errorMessage) {
        this.loadErrorMessage = data.errorMessage;
      } else {
        this.loadErrorMessage = null;
        this.passDataFileInfoService.setPassDataFileInfo(data);
      }
    }, (e) => {
      this.loadErrorMessage = e.message;
    });
  }
}
