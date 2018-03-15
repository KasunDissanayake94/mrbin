import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';


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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public items: FirebaseListObservable<Items[]>;
  public drivers: FirebaseListObservable<Drivers[]>;
  public bins: FirebaseListObservable<Bin[]>;


  constructor(db: AngularFireDatabase) {
    this.items = db.list('/bin');
    this.drivers = db.list('/driver');
    this.bins = db.list('/bin');

  }

}
