import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {OperationMode, PassDataService} from '../services/pass-data.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-operation-control',
  templateUrl: './operation-control.component.html',
  styleUrls: ['./operation-control.component.scss']
})
export class OperationControlComponent implements OnInit, OnDestroy {

  passDataDirty = false;
  operationMode: OperationMode;

  private passDataDirtySubscription: Subscription;

  constructor(
    public authService: AuthService,
    public passDataService: PassDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.passDataDirtySubscription =
      this.passDataService.currentPassDataDirty.subscribe(value => {
        this.passDataDirty = value;
      });
  }

  ngOnDestroy(): void {
    this.passDataDirtySubscription.unsubscribe();
  }

  onSaveButtonClick(event: any) {
    this.passDataService.savePassData();
  }

  onExitButtonClick(event: any) {
    this.authService.resetPassword();
    this.passDataService.clearPassData();
    this.router.navigate(['']).then();
  }

}
