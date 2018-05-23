import { Component, OnInit ,OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GeoService } from '../../service/geo.service'
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

  constructor(private http:Http,app:AppComponent) {
    //This component get from the AppComponent
    this.bin_obj = app.bins;
  }

  ngOnInit() {
    this.getUserLocation();
    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.bin_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        if(element[i].level == "high"){
          console.log(element[i].level);
          console.log("come");
          //Get the Optimal Solution
          let headers = new Headers();
          headers.append('Content-Type','application/json');
          this.http.post('http://localhost:3000/maps',{level:34},{headers:headers}).map(res=>res.json()).subscribe(res=>{
            console.log(res);
            console.log("come");
          });
          this.myarray.push([element[i].location.lat,element[i].location.lon,element[i].description]);
        }

      }
    });

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
