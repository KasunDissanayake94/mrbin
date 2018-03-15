import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
public driver_obj:any;

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.driver_obj = app.drivers;

  }

  ngOnInit() {
  }

}
