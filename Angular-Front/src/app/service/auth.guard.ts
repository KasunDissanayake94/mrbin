import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {sourceInfo} from "@angular/compiler-cli/src/metadata/evaluator";

@Injectable()
export class AuthGuard implements CanActivate {

  status: string;

  constructor(private router: Router,
              private authService: AuthService) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  // when the user is logged in and just navigated to another route...
  if (this.authService.isLoggedIn) { console.log(this.authService.isLoggedIn.asObservable); return true; }

  // proceeds if not loggedIn or F5/page refresh

  // Store the attempted URL for redirecting later
  this.authService.redirectUrl = state.url;

  // go login page
  this.router.navigate(['/']);
  return false;
}

}
