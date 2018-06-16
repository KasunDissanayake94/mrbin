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
  drivrid = '';

  //inorder to take size and store on on arrAY
  size: number;
  public myarr=[];

  driver_set = {
    //pri_key: '',
    //driver_id: '',
    name: '',
    mobile_no: '',
    truck_no: ''
  };

  updt_driver_set = {
   // pri_key: '',
    //driver_id: '',
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
    //this.driver_set.driver_id = null;
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

  //Testing Edit code

//Edit Driver Model here -------------------
  openEditDri(item:any){
    console.log(item[1].$name);

    //this.openDltDri1(item);

    //this.updt_driver_set.driver_id = item.driver_id;
    //this.driver_set.driver_id = item.$key;
    //this.driver_set.driver_id = item.driver_id;
    this.drivrid = item[1].$key;
    this.driver_set.name = item[1].name;
    this.driver_set.mobile_no = item[1].mobile_no;
    this.driver_set.truck_no = item[1].truck_no;
    this.dsplay="block";

}
  //Close button on Modal
  onCloseEditDri(){
    this.dsplay='none';
  }

  //when click Edit driver on editing modal this works
  editDriNow(mykey:any){

    console.log(this.driver_set);



    //this.updt_driver_set.driver_id = this.driver_set.driver_id;
    this.updt_driver_set.name = this.driver_set.name;
    this.updt_driver_set.mobile_no = this.driver_set.mobile_no;
    this.updt_driver_set.truck_no = this.driver_set.truck_no;

    console.log('updt_set: ');
    console.log(this.updt_driver_set);


    this.driver_obj.update(mykey, this.driver_set).then(console.log('wade hari1'));

    //this.driver_obj.push(this.driver_set).then(console.log('wade hari1'));
    console.log('updt_set: ');

   // this.driver_obj.update(this.updt_driver_set).then(console.log('wade hari'));


    this.onCloseEditDri();
  }

  // used to try xcept for update ------------------------

  openDltDri1(item:any){
    this.driver_obj.remove(item).then(console.log("Data Deleted"));

  }


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
    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.driver_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){

        console.log(element[i].level);
        this.myarr.push([i+1, element[i]]);


      }
    });

    console.log(this.myarr);
  }

}
