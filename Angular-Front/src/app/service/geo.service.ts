import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as GeoFire from 'geofire';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GeoService {

  dbRef: any;
  geoFire: any;

  hits = new BehaviorSubject([])

  constructor(private db: AngularFireDatabase) {
    console.log("csjcn");
    /// Reference database location for GeoFire
    this.dbRef = this.db.list('/locations');
    console.log(this.dbRef);
    this.geoFire = new GeoFire(this.dbRef.$ref);
  }

  /// Adds GeoFire data to database
  setLocation(key:string, coords: Array<number>) {
    this.geoFire.set(key, coords)
      .then(_ => console.log('location updated'))
      .catch(err => console.log(err))
  }


  /// Queries database for nearby locations
  /// Maps results to the hits BehaviorSubject
  getLocations(radius: number, coords: Array<number>) {
    this.geoFire.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {
        let hit = {
          location: location,
          distance: distance
        }

        let currentHits = this.hits.value
        currentHits.push(hit)
        this.hits.next(currentHits)
      })
  }

}
