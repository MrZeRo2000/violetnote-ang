import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit, AfterViewInit {
  @Input() inputPassword: string;
  @ViewChild('password', { static: true }) passwordElement: ElementRef;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.passwordElement.nativeElement.focus();
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
