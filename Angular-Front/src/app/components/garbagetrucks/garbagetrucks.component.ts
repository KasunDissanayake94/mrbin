import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-garbagetrucks',
  templateUrl: './garbagetrucks.component.html',
  styleUrls: ['./garbagetrucks.component.css']
})
export class GarbagetrucksComponent implements OnInit {

  public truck_obj:any;
  display='none';
  dsplay='none';
  dsplay2 = 'none';
  delete_item ='none;'
  truckid = '';

  public tblObj1: any;
  public garbage_truck: any;

  driver_set = {
    //pri_key: '',
    //driver_id: '',
    name: '',
    mobile_no: '',
    truck_no: ''
  };

  mydataset = {
    datarow1: 'Maneesha',
    datarow2: '12345',
    datarow3: 'svrdhba'
   // datarow4: 'svrdhba',
  };

  gar_truck = {
    truck_no : '',
    capacity : '',
    image:'',
  }


  constructor(app:AppComponent) {
    this.garbage_truck = app.garbage_truck;
  }

  ngOnInit() {
  }
  //Add Modal here -------------------------

  openModal(){
    //this.driver_set.driver_id = null;
    // this.driver_set.name = null;
    // this.driver_set.mobile_no = null;
    // this.driver_set.truck_no = null;
    this.gar_truck.truck_no = null;
    this.gar_truck.capacity = null;
    this.gar_truck.image = null;
    this.display="block";
  }


  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  addTruck(){
    this.garbage_truck.push(this.gar_truck);
    this.onCloseHandled();
  }

  //edit truck
  openEdittruck(item:any){
    console.log(item.$name);

    //this.openDltDri1(item);

    //this.updt_driver_set.driver_id = item.driver_id;
    //this.driver_set.driver_id = item.$key;
    //this.driver_set.driver_id = item.driver_id;
    this.truckid  = item.$key;

    this.gar_truck.truck_no = item.truck_no;
    this.gar_truck.capacity = item.capacity;
    this.dsplay="block";

  }
  //Close button on Modal
  onCloseEdittruck(){
    this.dsplay='none';
  }

  //delete truck
  openDlttruck(item:any){
    this.delete_item = item;
    this.dsplay2="block";
  }
  //Yes button on Modal
  yesDlttruck(){
    this.garbage_truck.remove(this.delete_item).then(console.log("Data Deleted"));
    this.dsplay2='none';
  }

  //No button on Modal
  noDlttruck(){
    this.dsplay2='none';
  }

}
