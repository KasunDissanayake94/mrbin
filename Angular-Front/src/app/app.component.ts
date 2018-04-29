import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import {Observable} from "rxjs/Observable";


//Get the Bin Details
class Items {
  constructor(public title) { }
}

//Get the drivers Details
class Drivers{
  constructor(){}
}

//Get the bin Details
class Bin{
  constructor(){
  }
}

//Get the loggin user details
class LoginUser{
  constructor(){
  }
}

//Get the feedback table from firebase
class FeedBack{
  constructor(){
  }
}

//Get the assigned drivers table from firebase
class Assigned_drivers{
  constructor(){
  }
}

//Get the requested bin table from firebase
class Req_bin{
  constructor(){
  }
}
//Get the Solved problems table from firebase
class Solved_prob{
  constructor(){
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: FirebaseListObservable<Items[]>;
  public drivers: FirebaseListObservable<Drivers[]>;
  public bins: FirebaseListObservable<Bin[]>;
  public feedbck: FirebaseListObservable<FeedBack[]>;
  public loginuser: FirebaseListObservable<LoginUser[]>;
  public assign_a_driver: FirebaseListObservable<Assigned_drivers[]>;
  public req_bins: FirebaseListObservable<Req_bin[]>;
  public slvdfeedbck: FirebaseListObservable<Solved_prob[]>;




  constructor(db: AngularFireDatabase) {
    this.items = db.list('/');
    this.drivers = db.list('/driver');
    this.bins = db.list('/bin');
    this.loginuser = db.list('/user');
    this.feedbck = db.list('/feedback_details');
    this.assign_a_driver = db.list('/assigned_drivers');
    this.req_bins = db.list('Bin_requests');
    this.slvdfeedbck = db.list('solved_problems')

  }

}
