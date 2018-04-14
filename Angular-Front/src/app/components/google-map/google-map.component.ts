import { Component, OnInit ,OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GeoService } from '../../service/geo.service'

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
        <agm-marker *ngFor="let marker of markers"
                    [latitude]="marker[0]"
                    [longitude]="marker[1]"
                    [iconUrl]="'../../assets/img/map_icon3.png'">

          <agm-info-window>
            <h3><strong>Bin Filled</strong></h3>

            <p>{{ marker[3]}} </p>
          </agm-info-window>

        </agm-marker>

      </agm-map>

      </div>
  `
})
export class GoogleMapComponent implements OnInit {

  lat: number;
  lng: number;
//latitude and logitude
  public markers =  [
    [6.916905, 79.867740,"bin_1","Royal College Primary Section"],
    [6.935570, 79.847956,"bin_2","Near Public Library"],
    [6.927391, 79.844995,"bin_3","Ananda College Primary Section"],
    [6.923727, 79.882975,"bin_4","University of Colombo faculty of Science"],
    [6.871723, 79.879094,"bin_5","House of Fashion Bin"]
  ];
  subscription: any;
  private geo: GeoService;

  constructor(app:AppComponent) { }

  ngOnInit() {
    this.getUserLocation()

  }

  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat);
        console.log(this.lng);

      });
    }
  }

}
