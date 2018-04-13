import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import {_if} from "rxjs/observable/if";


@Component({
  selector: 'app-filledbins',
  templateUrl: './filledbins.component.html',
  styleUrls: ['./filledbins.component.css']


})
export class FilledbinsComponent implements OnInit {
  public bin_obj:any;
  public drivers_obj:any;
  public assigned_obj:any;
  public req_bin_obj: any;


  display='none';
  dsply = 'none';
  dsply2 = 'none';


  bin = {
    //bin_id: '',
    user_id: '',
    description: '',
    location: '',
    level: 'low'

  };

  assigned_drivers1 = {
    bin_id: '',
    location: '',
    assigned_dri_id: ''
  };




  constructor(app:AppComponent) {
    //This component get from the AppComponent
    this.bin_obj = app.bins;
    this.drivers_obj = app.drivers;
    this.assigned_obj = app.assign_a_driver;
    this.req_bin_obj = app.req_bins;
  }


  //After Clicking Add Bin Button this Model will be called
  openmyModal(){
    this.display="block";
  }
  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  //Add New Bin
  add_new_bin(){
    this.bin_obj.push(this.bin);
    this.onCloseHandled();
  }

  //After Clicking Assign a driver this Model will be called
  openAssign(item:any){
    this.dsply="block";

    //this.bin.bin_id = item.$key;
    this.bin.location = item.location;

    this.assigned_drivers1.location = item.location;
    this.assigned_drivers1.assigned_dri_id = null;
    this.assigned_drivers1.bin_id = item.$key;

  }
  closeAssign(){
    this.dsply='none';
  }
  //After select assign on assign a driver
  assignNow(){
    console.log(this.assigned_drivers1);
    console.log(this.assigned_drivers1.bin_id);

    this.assigned_obj.push(this.assigned_drivers1);
    this.closeAssign();
  }

  searchIt(){
    console.log('found items');
  }

  //After Clicking view assigned drivers this Model will be called
  showAssigned(){
    this.dsply2="block";
  }
  //Close button on Modal
  clsAssigned(){
    this.dsply2='none';
  }


  ngOnInit() {
  }

}
