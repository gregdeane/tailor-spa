import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'toh-app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.component.scss')],
  template: `
    <div class="container">
      <nav class="navbar navbar-light bg-faded row">
        <a routerLink="/" class="navbar-brand">{{ title }}</a>
        <div class="nav navbar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item nav-link">
            Dashboard
          </a>
          <a routerLink="/heroes" routerLinkActive="active" class="nav-item nav-link">
            Heroes
          </a>
          <a routerLink="/admin" routerLinkActive="active" class="nav-item nav-link">
            Admin
          </a>
          <a routerLink="/login" routerLinkActive="active" class="nav-item nav-link pull-xs-right">
            Login
          </a>
        </div>
      </nav>
      <main class="row">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}
