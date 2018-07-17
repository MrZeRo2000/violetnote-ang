import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly AUTH_TIMEOUT = 1000 * 60 * 10;

  private password: string = null;

  constructor() { }

  public setPassword(password: string) {
    console.log('Set password as ' + password);
    this.password = password;
    setTimeout(() => this.resetPassword(), AuthService.AUTH_TIMEOUT);
  }

  public resetPassword() {
    this.password = null;
  }

  public isPasswordProvided() {
    return this.password != null;
  }

  public getPassword() {
    return this.password;
  }
}
