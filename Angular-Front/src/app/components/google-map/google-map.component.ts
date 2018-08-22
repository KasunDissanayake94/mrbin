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
    <div class="jumbotron" style="margin-left: 50px">
    <div class="row">
      <div class="col-md-3">
        <div class="form-group has-success">
          <label class="form-control-label" for="inputSuccess1">Enter Trucks Count</label>
          <small id="fileHelp" class="form-text text-muted">*Enter Maximum Number of Trucks system can use</small>
          <div class="form-group">
            <select class="custom-select" [(ngModel)]="truck_amount">
              <option value="{{default_trucks}}" selected="">{{default_trucks}} (Max)</option>
              <option value="{{default_trucks-1}}">{{default_trucks-1}}</option>
              <option value="{{default_trucks-2}}">{{default_trucks-2}}</option>
              <option value="{{default_trucks-3}}">{{default_trucks-3}}</option>
            </select>
          </div>
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="inputSuccess1">Enter Tractor Count</label>
          <small id="fileHelp" class="form-text text-muted">*Enter Maximum Number of Tractors system can use</small>
          <div class="form-group">
            <select class="custom-select"  [(ngModel)]="tractor_amount">
              <option value="{{default_tractor}}" selected="">{{default_tractor}} (Max)</option>
              <option value="{{default_tractor-1}}">{{default_tractor-1}}</option>
              <option *ngIf="default_tractor-2 >= 0" value="{{default_tractor-2}}">{{default_tractor-2}}</option>
              <option *ngIf="default_tractor-3 >= 0" value="{{default_tractor-3}}">{{default_tractor-3}}</option>
            </select>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-block" (click)="generate_path()">Generate Path</button>
      </div>
      <div class="col-md-9" *ngIf="lat && lng">

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

          <agm-direction *ngFor="let marker of push_array"
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
  private truck_amount = 0;
  private tractor_amount = 0;
  private total_capacity = 0;
  private average_truck_capacity = 10000;
  private average_tractor_capacity = 2000;
  private average_garbagebin_capacity = 250;
  private max_bins = 0;
  private garbage_truck: any;
  private default_trucks = 0;
  private default_tractor = 0;




  constructor(private http:Http,app:AppComponent) {
    //This component get from the AppComponent
    this.bin_obj = app.bins;
    this.garbage_truck = app.garbage_truck;
  }

  ngOnInit() {
    this.dir = {
      //The Origin of the process should be started
      origin: { lat: 6.915810, lng: 79.863773 },
    }
    this.garbage_truck.forEach(element =>{
      var size1 = element.length;
      for (var i =0 ; i<size1;i++){
        if(element[i].truck_type == "Garbage Truck") {
          this.default_trucks = this.default_trucks+1;
        }else if(element[i].truck_type == "Garbage Tractor"){
          this.default_tractor = this.default_tractor+1;
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
  private generate_path(){
    console.log(this.tractor_amount);
    console.log(this.truck_amount);
    this.total_capacity = this.tractor_amount*this.average_tractor_capacity + this.truck_amount*this.average_truck_capacity;
    this.max_bins = this.total_capacity/this.average_garbagebin_capacity;
    console.log(this.max_bins);
    this.calculate_path();
  }

  private calculate_path(){
    this.getUserLocation();
    const sortJsonArray = require('sort-json-array');
    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.bin_obj.forEach(element => {
      this.size = element.length;
      this.push_array =[];
      for (var i =0 ; i<this.size;i++){
        if(element[i].level) {
          //Define lockdata object for calculation
          const lockdata = {
            bin_id: element[i].$key,
            level: element[i].level/10 ,
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
              console.log(this.push_array);
            });
          this.myarray.push([element[i].location.lat, element[i].location.lon, element[i].description]);
        }
      }
    });

  }


}
