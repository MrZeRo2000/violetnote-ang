import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PassDataService} from '../services/pass-data.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-pass-data',
    templateUrl: './pass-data.component.html',
    styleUrls: ['./pass-data.component.scss'],
    standalone: false
})
export class PassDataComponent implements OnInit, OnDestroy {
  isLoading = false;
  loadErrorMessage = null;

  constructor(private authService: AuthService,
              public passDataService: PassDataService,
              private router: Router) { }

  private passDataServiceSubscription: Subscription;
  private passDataLoadingStateSubscription: Subscription;

  ngOnInit() {
    this.passDataServiceSubscription = this.passDataService.currentPassData.subscribe(data => {
      if (!data) {
        this.authService.resetPassword();
        this.router.navigate(['']);
      }
      this.passDataLoadingStateSubscription = this.passDataService.currentLoadingState.subscribe(value => {
        this.isLoading = value;
      });
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
    this.passDataServiceSubscription.unsubscribe();
    this.passDataLoadingStateSubscription.unsubscribe();
  }

  private loadPassData() {
    this.passDataService.loadPassData();
  }

  onTryAgainClick(event) {
    event.preventDefault();
    this.authService.resetPassword();
    this.router.navigate(['']);
  }
}
