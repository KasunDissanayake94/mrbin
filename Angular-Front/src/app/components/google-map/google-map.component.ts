import { Component, OnInit ,OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GeoService } from '../../service/geo.service'
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { map } from '../../../../node_modules/@firebase/util';
import { componentRefresh, containerRefreshEnd } from '../../../../node_modules/@angular/core/src/render3/instructions';
import { trigger } from '../../../../node_modules/@angular/core/src/animation/dsl';
import { AgmMap } from '../../../../node_modules/@agm/core';
import { filter } from '../../../../node_modules/rxjs/operator/filter';

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
    <div class="jumbotron" style="margin-left: 50px">
        <div class="row">
    <div class="col-md-3">
    <div class="form-group">
  <label class="col-form-label" for="inputDefault">Enter No of Garbage Trucks can use Today</label>
  <input type="text" class="form-control" placeholder="0" [(ngModel)]="filter.trucks" id="inputDefault">
</div>
<div class="form-group">
  <label class="col-form-label" for="inputDefault">Enter No of Garbage Tractors can use Today</label>
  <input type="text" class="form-control" placeholder="0" [(ngModel)]="filter.tractors" id="inputDefault">
</div>
<div class="form-group">
  <label class="col-form-label" for="inputDefault">Enter Expected Capacity</label>
  <input type="text" class="form-control" placeholder="500000Lts" [(ngModel)]="filter.capacity" id="inputDefault">
</div>
<button type="button" class="btn btn-primary btn-lg btn-block" (click)="filter_path()">Show Route</button>
<button type="button" class="btn btn-danger btn-lg btn-block" (click)="pause_running()">Pause Running</button>

    </div>
    <div class="col-md-9 map_class"  *ngIf="lat && lng">
      <agm-map [latitude]="lat" [longitude]="lng" [zoom]="15" (mapReady)="mapReady($event)">

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

        <agm-direction *ngFor="let marker of push_array;let i=index"
                       [origin]="dir.origin" [destination]="{ lat:(marker.lat), lng: (marker.lon) }"></agm-direction>


      
      </agm-map>
      
      </div>
      </div>
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
  private sum_capacity =0;
  filter = {
    capacity: 0,
    trucks: 0,
    tractors: 0
  };
  pause = false;
  garbage_bin_capacity = 10000;
  garbage_truck_capacity = 10000;
  garbage_tractor_capacity = 5000;
  default_capacity = 500000;
  no_of_bins = 100 ;


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
    this.calculate_path();    
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
  //Calculate the path
  private calculate_path(){
    const sortJsonArray = require('sort-json-array');
    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.bin_obj.forEach(element => {
      if(this.pause){
        console.log("Pause Chosen");
      }else{
        console.log("Running");
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
                this.push_array.push({msg:data.msg,bin_id:data.id,description:data.description,lon:data.lon,lat:data.lat});
                //this.new_array.push([data.lat,data.lon]);
                //console.log(this.new_array);
                sortJsonArray(this.push_array,'msg','des');
                this.push_array = this.push_array.slice(0,this.no_of_bins);
                console.log("Bins",this.no_of_bins);
 
              });
            this.myarray.push([element[i].location.lat, element[i].location.lon, element[i].description]);
          }
          }}
    });    

  }
  //Filter path for the user
  private filter_path(){
    this.generate_route();  
    this.calculate_path();  
  }
  //pause auto refreshing
  private pause_running(){
    this.pause = true;
  }
  private generate_route(){
    this.no_of_bins = (this.garbage_truck_capacity*(this.filter.trucks)+(this.garbage_tractor_capacity*(this.filter.tractors)))/this.garbage_bin_capacity;
    console.log(this.no_of_bins);
  }



}
