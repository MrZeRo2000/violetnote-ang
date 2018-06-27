import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly AUTH_TIMEOUT = 1000 * 60 * 10;

  private password: String = null;

  constructor() { }

  public setPassword(password: String) {
    console.log('Set password as ' + password);
    this.password = password;
    setTimeout(() => this.resetPassword(), AuthService.AUTH_TIMEOUT);
  }

  private resetPassword() {
    this.password = null;
  }

  public isPasswordProvided() {
    return this.password != null;
  }
}
