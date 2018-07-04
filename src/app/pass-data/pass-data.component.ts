import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {PassDataReaderService} from '../pass-data-reader.service';
import {PassDataService} from '../pass-data.service';
import {PassData} from '../pass-data';

@Component({
  selector: 'app-pass-data',
  templateUrl: './pass-data.component.html',
  styleUrls: ['./pass-data.component.css']
})
export class PassDataComponent implements OnInit {
  isLoading = false;
  loadErrorMessage = null;

  constructor(private authService: AuthService,
              private passDataReaderService: PassDataReaderService,
              public passDataService: PassDataService) { }

  ngOnInit() {
    console.log('PassDataComponent On Init with password = ' + this.authService.getPassword());
    const o = this.passDataReaderService.getPassDataJSON(this.authService.getPassword());
    this.isLoading = true;
    o.subscribe((data: PassData) => {
      setTimeout( () => {
          this.passDataService.setPassData(data);
          this.isLoading = false;
        }, 1000
      );
    }, (e) => {
      this.loadErrorMessage = 'Error loading data: ' + e.message;
    });
  }

  onTryAgainClick() {
    this.authService.resetPassword();
  }
}