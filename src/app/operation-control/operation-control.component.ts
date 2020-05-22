import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PassDataService} from '../services/pass-data.service';
import {PassDataReaderService} from '../services/pass-data-reader.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-operation-control',
  templateUrl: './operation-control.component.html',
  styleUrls: ['./operation-control.component.scss']
})
export class OperationControlComponent implements OnInit {

  passDataDirty = false;

  constructor(
    public authService: AuthService,
    public passDataService: PassDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passDataService.currentPassDataDirty.subscribe(value => {
      this.passDataDirty = value;
    });
  }

  onSaveButtonClick(event: any) {

  }

  onExitButtonClick(event: any) {
    this.authService.resetPassword();
    this.passDataService.clearPassData();
    this.router.navigate(['']).then();
  }

}
