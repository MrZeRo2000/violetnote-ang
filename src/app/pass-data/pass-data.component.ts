import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PassDataReaderService} from '../services/pass-data-reader.service';
import {PassDataService} from '../services/pass-data.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

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
              public passDataService: PassDataService,
              private router: Router) { }

  ngOnInit() {
    if (!this.passDataService.isPassData()) {
      this.loadPassData();
    }
  }

  private loadPassData() {
    const o = this.passDataReaderService.getPassDataJSON(this.authService.getPassword());
    this.isLoading = true;
    o.subscribe((data: any) => {
      setTimeout(() => {
          if (data.errorMessage) {
            this.loadErrorMessage = data.errorMessage;
          } else {
            this.passDataService.setPassData(data);
          }
          this.isLoading = false;
        }, environment.loadDelay
      );
    }, (e) => {
      this.isLoading = false;
      this.loadErrorMessage = e.message;
    });
  }

  onTryAgainClick(event) {
    event.preventDefault();
    this.authService.resetPassword();
    this.router.navigate(['']);
  }
}
