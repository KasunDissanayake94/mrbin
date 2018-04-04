import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import {$} from "protractor";



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
  delete_item ='none;'

  driver_set = {
    driver_id: '',
    name: '',
    mobile_no: '',
    truck_no: ''
  };

  updt_driver_set = {
    pri_key: '',
    driver_id: '',
    name: '',
    mobile_no: '',
    truck_no: ''
  };

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.driver_obj = app.drivers;

  }

//Add Modal here -------------------------

  openModal(){
    this.driver_set.driver_id = null;
    this.driver_set.name = null;
    this.driver_set.mobile_no = null;
    this.driver_set.truck_no = null;
    this.display="block";
  }
  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  //Add driver method execution

  addDriver(){
    this.driver_obj.push(this.driver_set);
    this.onCloseHandled();
  }
//Edit Driver Model here -------------------
  openEditDri(item:any){
    console.log(item.$name);

    //this.openDltDri1(item);

    this.driver_set.driver_id = item.$key;
    this.driver_set.name = item.name;
    this.driver_set.mobile_no = item.mobile_no;
    this.driver_set.truck_no = item.truck_no;
    this.dsplay="block";

}
  //Close button on Modal
  onCloseEditDri(){
    this.dsplay='none';
  }

  //when click Edit driver on editing modal this works
  editDriNow(){

    console.log(this.driver_set);

    this.updt_driver_set.pri_key = this.driver_set.driver_id;
    this.updt_driver_set.name = this.driver_set.name;
    this.updt_driver_set.mobile_no = this.driver_set.mobile_no;
    this.updt_driver_set.truck_no = this.driver_set.truck_no;

    console.log(this.updt_driver_set);

    //this.driver_obj.update(this.updt_driver_set).then(console.log('wade hari'));
    

    this.onCloseEditDri();
  }

  // used to try xcept for update ------------------------

  /*openDltDri1(item:any){
    this.driver_obj.remove(item).then(console.log("Data Deleted"));

  }*/


  // Delete driver modal here ------------------------

  openDltDri(item:any){
    this.delete_item = item;
    this.dsplay2="block";
  }
  //Yes button on Modal
  yesDltDri(){
    this.driver_obj.remove(this.delete_item).then(console.log("Data Deleted"));
    this.dsplay2='none';
  }

  //No button on Modal
  noDltDri(){
    this.dsplay2='none';
  }

  ngOnInit() {
  }

}
