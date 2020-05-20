import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly AUTH_TIMEOUT = 1000 * 60 * 10;

  private password: string = null;
  private resetTimeOut: any;

  constructor() { }

  public setPassword(password: string) {
    console.log('Set password as ' + password);
    this.password = password;

    if (this.resetTimeOut) {
      clearTimeout(this.resetTimeOut);
    }
    this.resetTimeOut = setTimeout(() => this.resetPassword(), AuthService.AUTH_TIMEOUT);
  }

  public resetPassword() {
    console.log('resetting password');
    this.password = null;
  }

  public isPasswordProvided() {
    return this.password != null;
  }

  public getPassword() {
    return this.password;
  }
}
