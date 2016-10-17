import { Injectable } from '@angular/core';
import {
  Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot,
  CanActivate, CanActivateChild, CanLoad
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    return this.authService.isLoggedIn || this.forceLogin(url);
  }

  forceLogin(url: string): boolean {
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);   // this line automatically cancels the current navigation
    return false;                       // `return false` is used just to make this point clear
  }
}
