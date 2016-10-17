import { Component } from '@angular/core';

@Component({
  template: `
    <h3>ADMIN</h3>
    <nav class="nav nav-inline">
      <a routerLink="./" routerLinkActive="active"
         routerLinkActiveOptions="{ exact: true }"
         class="nav-link active" href="#">
        Dashboard
      </a>
      <a  routerLink="./heroes" routerLinkActive="active"
          class="nav-link" href="#">
        Manage Heroes
      </a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {}
