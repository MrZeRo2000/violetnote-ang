import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PassDataFileInfoService} from '../services/pass-data-file-info.service';
import {PassDataFileInfo} from '../model/pass-data-file-info';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';
import {PassDataService} from '../services/pass-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() inputPassword: string;

  @ViewChild('password') passwordElement: ElementRef;
  @ViewChildren('password') passwordElements: QueryList<ElementRef>;

  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private passDataFileNameService: PassDataFileNameService,
    private passDataService: PassDataService
    ) { }

  passDataFileInfo: PassDataFileInfo;

  private passDataFileInfoSubscription: Subscription;
  private passDataSubscription: Subscription;

  ngOnInit() {
    this.passDataFileInfoSubscription = this.passDataFileNameService.currentPassDataFileInfo.subscribe(value => {
      this.passDataFileInfo = value;
    });
    this.passDataSubscription = this.passDataService.currentPassData.subscribe(value => {
      this.loading = false;
      if (value) {
        this.router.navigate(['main']);
      } else {
        this.setPasswordFocus();
      }
    });

    this.setPasswordFocus();
  }

  ngAfterViewInit(): void {
    console.log('in AfterViewInit');
    if (this.passwordElements.first) {
      console.log('setting focus from first element');
      this.passwordElements.first.nativeElement.focus();
    }
    this.passwordElements.changes.subscribe(value => {
      if (this.passwordElements.length > 0) {
        console.log('setting focus from elements changes');
        this.passwordElements.first.nativeElement.focus();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.passDataFileInfoSubscription) {
      this.passDataFileInfoSubscription.unsubscribe();
    }
    if (this.passDataSubscription) {
      this.passDataSubscription.unsubscribe();
    }
  }

  private setPasswordFocus() {
    if (this.passwordElement && this.passwordElement.nativeElement) {
      console.log('setting focus from element');
      this.passwordElement.nativeElement.focus();
    }
  }

  onSubmitPassword() {
    this.loading = true;
    this.submitPassword(this.inputPassword);
  }

  onPasswordKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.submitPassword(this.inputPassword);
    }
  }

  private submitPassword(password: string) {
    this.authService.setPassword(password);
    this.passDataService.loadPassData();
  }
}
