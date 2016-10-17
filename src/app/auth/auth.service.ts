import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;

  // simulating an authentication api call
  login(): Observable<boolean> {
    return Observable.of(true)
      .delay(1000)
      .do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
