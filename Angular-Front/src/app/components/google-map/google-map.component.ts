import { Component, OnInit ,OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GeoService } from '../../service/geo.service'
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styles: [`
    agm-map {
      height: 1000px;
    }
  `],
  template: `
    <app-sidebar></app-sidebar>
    <div *ngIf="lat && lng">

      <agm-map [latitude]="lat" [longitude]="lng" [zoom]="13">

        <agm-marker [latitude]="lat" [longitude]="lng" >

          <agm-info-window>
            <h3><strong>Location</strong></h3>
            <p>You are here!</p>
          </agm-info-window>

        </agm-marker>
        <agm-marker *ngFor="let marker of myarray"
                    [latitude]="marker[0]"
                    [longitude]="marker[1]"
                    [iconUrl]="'../../assets/img/map_icon3.png'">

          <agm-info-window>
            <h3><strong>Bin Filled</strong></h3>

            <p>{{ marker[2]}} </p>
          </agm-info-window>

        </agm-marker>
        <agm-marker 
        [latitude]="dir.origin.lat"
        [longitude]="dir.origin.lng"
        [iconUrl]="'../../assets/img/house.png'">

        </agm-marker>        

        <agm-direction *ngFor="let marker of push_array;let i=index"
                       [origin]="dir.origin" [destination]="{ lat:(marker.lat), lng: (marker.lon) }"></agm-direction>

      </agm-map>

      </div>
  `
})


export class GoogleMapComponent implements OnInit {

  lat: number;
  lng: number;
  size: number;
  public bin_obj:any;
  //Define an multi dimentional array to store bins locations
  public  myarray =[];
  subscription: any;
  private geo: GeoService;
  dir:any;
  private push_array= [];
  private new_array= [];




  constructor(private http:Http,app:AppComponent) {
    //This component get from the AppComponent
    this.bin_obj = app.bins;
  }

  ngOnInit() {
    this.dir = {
      //The Origin of the process should be started
      origin: { lat: 6.915810, lng: 79.863773 },
    }



    this.getUserLocation();
    var sortJsonArray = require('sort-json-array');
    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.bin_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        if(element[i].level) {
          //Define lockdata object for calculation
          const lockdata = {
            bin_id: element[i].$key,
            level: element[i].level,
            priority: element[i].location.priority,
            description: element[i].description,
            longit: element[i].location.lon,
            latti: element[i].location.lat
          };
          //Pass lockdata to backend and get optimal solution as response
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.post('http://localhost:3000/maps', lockdata, {headers: headers}).map(response => response.json())
            .subscribe((data) => {
              this.push_array.push({bin_id:data.id,description:data.description,lon:data.lon,lat:data.lat,opti_val:data.value});
              //this.new_array.push([data.lat,data.lon]);
              //console.log(this.new_array);
              sortJsonArray(this.push_array,'opti_val','des');
              console.log(this.push_array);
                        });
          this.myarray.push([element[i].location.lat, element[i].location.lon, element[i].description]);
        }
        }
    });
    
    //console.log(sortJsonArray(this.push_array,'msg','asc'));
    
  }



  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }


}