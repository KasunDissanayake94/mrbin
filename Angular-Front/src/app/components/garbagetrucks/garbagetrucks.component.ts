import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-garbagetrucks',
  templateUrl: './garbagetrucks.component.html',
  styleUrls: ['./garbagetrucks.component.css']
})
export class GarbagetrucksComponent implements OnInit {

  // public truck_obj:any;
  display='none';
  dsplay='none';
  dsplay2 = 'none';
  delete_item ='none;'
  truckid = '';
  display_success='none';
  //
  // public tblObj1: any;
  public garbage_truck: any;

  gar_truck = {
    truck_no : '',
    truck_type : '',
    capacity : '',
    image:'',
  }

  // Edit truck set
  updt_truck_set = {
    // pri_key: '',
    //driver_id: '',
    truck_no : '',
    truck_type : '',
    capacity : '',
    image:'',
  };


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
    this.gar_truck.truck_type = null;
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
    this.gar_truck.truck_type = item.truck_type;
    this.gar_truck.capacity = item.capacity;
    this.dsplay="block";

  }

  //when click Edit driver on editing modal this works
  editTruckNow(mykey:any){

    console.log(this.gar_truck);



    //this.updt_driver_set.driver_id = this.driver_set.driver_id;
    this.updt_truck_set.truck_no = this.gar_truck.truck_no;
    this.updt_truck_set.truck_type = this.gar_truck.truck_type;
    this.updt_truck_set.capacity = this.gar_truck.capacity;
    this.updt_truck_set.image = this.gar_truck.image;

    console.log('updt_set: ');
    console.log(this.updt_truck_set);


    this.garbage_truck.update(mykey, this.gar_truck).then(console.log('done'));

    //this.driver_obj.push(this.driver_set).then(console.log('wade hari1'));
    console.log('updt_set: ');

    // this.driver_obj.update(this.updt_driver_set).then(console.log('wade hari'));


    this.succesModal();
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

  // add success modal
  succesModal(){
    this.dsplay='none';
    this.display_success='block';

  }

  //Close Success Modal
  closeSuccess(){
    this.display_success='none';
  }

}
