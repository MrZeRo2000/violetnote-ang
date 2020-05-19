import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PassDataFileInfoService} from '../services/pass-data-file-info.service';
import {PassDataFileInfo} from '../model/pass-data-file-info';
import {PassDataFileNameService} from '../services/pass-data-file-name.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit, AfterViewInit {
  @Input() inputPassword: string;

  @ViewChildren('password') passwordElements: QueryList<ElementRef>;

  constructor(private authService: AuthService, private passDataFileNameService: PassDataFileNameService, private router: Router) { }

  passDataFileInfo: PassDataFileInfo;

  ngOnInit() {
    this.passDataFileNameService.currentPassDataFileInfo.subscribe(value => {
      this.passDataFileInfo = value;
    });
  }

  ngAfterViewInit(): void {
    this.passwordElements.changes.subscribe(value => {
      if (this.passwordElements.length > 0) {
        this.passwordElements.first.nativeElement.focus();
      }
    });
  }

  onSubmitPassword() {
    this.submitPassword(this.inputPassword);
  }

  onPasswordKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.submitPassword(this.inputPassword);
    }
  }

  private submitPassword(password: string) {
    this.authService.setPassword(password);
    this.router.navigate(['main']);
  }
}
