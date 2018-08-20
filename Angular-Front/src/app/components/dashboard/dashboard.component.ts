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
  public bin_obj:any;
  public garbage_truck:any;

  private myarray = [];
  private size: number;
  gaugeType = "full";
  gaugeValue = 28.3;
  gaugeLabel = "Collection";
  gaugeAppendText = "L/day";


  constructor(private http:Http,app:AppComponent) {
    this.bin_obj = app.bins;
    this.garbage_truck = app.garbage_truck;

    this.getUserLocation();
    this.getbins();
  }
  thresholdConfig = {
    '0': {color: 'green'},
    '40': {color: 'orange'},
    '75.5': {color: 'red'}
  };



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
    /// locate Urban Council
    console.log("Google map called");
    this.lat = 6.915810;
    this.lng = 79.863773;
  }

  private getbins() {
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

          this.myarray.push([element[i].location.lat, element[i].location.lon, element[i].description]);
        }
      }
    });
  }
}
