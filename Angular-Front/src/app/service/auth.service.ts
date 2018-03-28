import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {AppComponent} from "../app.component";


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  userEmail :String;
  userId : String;
  logginstatus : boolean = false;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          //get the user object
          this.userDetails = user;
          //user Email details
          this.userEmail = this.userDetails.email;
          //get user Id
          this.userId = this.userDetails.uid;
          //maintain user loggin in status
          this.loggedIn()

        }
        else {
          this.userDetails = null;
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
  //check whether user logged in to the system or not
  isLoggedIn(): Observable<boolean> {
    return this._firebaseAuth.authState.map((auth) =>  {
      if(auth == null) {
        return false;
      } else {
        return true;
      }
    });
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
