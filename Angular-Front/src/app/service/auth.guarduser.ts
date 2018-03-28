import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuarduser implements CanActivate {


  isLoggedInUser$: Observable<boolean>;
  logstatus : boolean;

  constructor(private _auth: AuthService, private _router: Router, private _firebaseAuth: AngularFireAuth) {
    this.isLoggedInUser$ = _auth.isLoggedIn();

    this.isLoggedInUser$.subscribe(res => {
      if(res){
        this.logstatus = true;
        console.log('user  signed in');
        this._router.navigate(['dashboard'])
      }else{
        this.logstatus = false;
        console.log('user not signed in');
        this._router.navigate([''])
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.isLoggedInUser$){
      return true;
    }else{
      return true;
    }
  }
}
