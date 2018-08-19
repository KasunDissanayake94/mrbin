import { Component, OnInit ,OnDestroy } from '@angular/core';
import { AppComponent } from '../../app.component';
import { GeoService } from '../../service/geo.service'
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private lng: number;
  private lat: number;

  constructor() {
    this.getUserLocation();
  }

  lastCollected:number;
  todayCollect : number;
  monthCollection = {
    January:50,
    February:45,
    March:67,
    April:55,
    May:52,
    June:50,
    July:50,
    August:40,
    September:0,
    October:0,
    November:0,
    December:0
  };

  ngOnInit() {

    this.lastCollected = this.lastCollected+this.todayCollect;
    this.todayCollect =0;
  }


  collectIt(amount : number){
    this.todayCollect = amount;


  }
  private getUserLocation() {
    /// locate the user
    console.log("Google map called");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}
