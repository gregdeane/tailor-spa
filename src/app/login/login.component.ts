import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{ message }}</p>
    <div>
      <button *ngIf="!authService.isLoggedIn"
              (click)="login()"
              class="btn btn-primary">
        Login
      </button>
      <button *ngIf="authService.isLoggedIn"
              (click)="logout()"
              class="btn btn-secondary">
        Logout
      </button>
    </div>
  `
})
export class LoginComponent {
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.setMessage();
  }

  setMessage(): void {
    let status = (this.authService.isLoggedIn && 'in') || 'out';
    this.message = `Logged ${status}`;
  }

  login(): void {
    this.message = 'Logging in...';

    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl || '/admin';
        this.router.navigate([redirect]);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.setMessage();
  }
}
