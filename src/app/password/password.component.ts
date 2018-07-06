import { Component, OnInit, Input } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  @Input() inputPassword: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitPassword() {
    this.submitPassword(this.inputPassword);
  }

  onPasswordKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.submitPassword(this.inputPassword);
    }
  }

  private submitPassword(password: String) {
    this.authService.setPassword(password);
    this.router.navigate(['main']);
  }
}
