import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';



@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
public driver_obj:any;
  display='none';
  dsplay='none';
  dsplay2 = 'none';

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.driver_obj = app.drivers;
  }
//After Clicking Add Driver Button this Model will be called
  openModal(){
    this.display="block";
  }
  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  openEditDri(){
  this.dsplay="block";
}
  //Close button on Modal
  onCloseEditDri(){
    this.dsplay='none';
  }

  //Open dlt driver

  openDltDri(){
    this.dsplay2="block";
  }
  //Close button on Modal
  closeDltDri(){
    this.dsplay2='none';
  }



  ngOnInit() {
  }

}
