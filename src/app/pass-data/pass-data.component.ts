import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PassDataReaderService} from '../services/pass-data-reader.service';
import {PassDataService} from '../services/pass-data.service';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {PassData} from '../model/pass-data';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pass-data',
  templateUrl: './pass-data.component.html',
  styleUrls: ['./pass-data.component.scss']
})
export class PassDataComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadErrorMessage = null;

  passData: PassData = null;

  constructor(private authService: AuthService,
              private passDataReaderService: PassDataReaderService,
              public passDataService: PassDataService,
              private router: Router) { }

  private passDataServiceSubscription: Subscription;

  ngOnInit() {
    this.passDataServiceSubscription = this.passDataService.currentPassData.subscribe(data => {
      if (!data) {
        this.authService.resetPassword();
        this.router.navigate(['']);
      }
    });
    /*
    this.passDataService.currentPassData.subscribe(data => {
      this.isLoading = false;
      if (data) {
        this.passData = data;
      } else {
        this.authService.resetPassword();
        this.router.navigate(['']);
      }
    });

     */
  }

  ngOnDestroy(): void {
    if (this.passDataServiceSubscription) {
      this.passDataServiceSubscription.unsubscribe();
    }
  }

  private loadPassData() {
    this.isLoading = true;
    this.passDataService.loadPassData();
  }

  onTryAgainClick(event) {
    event.preventDefault();
    this.authService.resetPassword();
    this.router.navigate(['']);
  }
}
