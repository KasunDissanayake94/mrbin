import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  userEmail :String;
  public authState = new Subject();
  redirectUrl: string;
  // BehaviorSubjects have an initial value.
  // isLoggedIn is property (not function) now:
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.userEmail = this.userDetails.email;
          this.isLoggedIn.next(true);
          console.log(this.isLoggedIn);
          if(this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
          }
        }
        else {
          this.userDetails = null;
          this.isLoggedIn.next(false);
        }
      }
    );
  }

//sign in with GMail Option
  signInWithGoogle() {

    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  //User Logout
  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

//sign in with typing email and password
  signInRegular(email, password) {

    const credential = firebase.auth.EmailAuthProvider.credential( email, password );
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
//check the current user and update the navbar
  loggedIn() {
    return this.userDetails;
  }
  getEmail(){
    return this.userEmail;
  }
}
