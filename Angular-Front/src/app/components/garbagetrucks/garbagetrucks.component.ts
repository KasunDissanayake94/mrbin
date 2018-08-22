import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { FlashMessagesService } from 'angular2-flash-messages';


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
  dsplay3 = 'none';
  delete_item ='none;'
  truckid = '';
  display_success='none';
  display_addsuccess='none';
  view_truck_no='';
  //
  // public tblObj1: any;
  public garbage_truck: any;
  public drivers_obj: any;

  addTruckValid = true;
  editTruckValid = true;

  //inorder to take size and store on on arrAY
  size: number;
  public myarr=[];


  gar_truck = {
    truck_no : '',
    truck_type : '',
    capacity : '',
    image:'',
    drivername:''
  };

  // Edit truck set
  updt_truck_set = {
    // pri_key: '',
    //driver_id: '',
    truck_no : '',
    truck_type : '',
    capacity : '',
    image:'',
    drivername:''
  };


  constructor(app:AppComponent, private flashMessagesService: FlashMessagesService) {
    this.garbage_truck = app.garbage_truck;
    this.drivers_obj = app.drivers;
  }

  ngOnInit() {
    this.garbage_truck.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){

        console.log(element[i].level);
        this.myarr.push([i+1, element[i]]);


      }
    });
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
    this.gar_truck.drivername = null;
    this.display="block";
  }


  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

   //check Validation in add driver function
  
   checkAddTruValid(){

    if(this.gar_truck.truck_no == null){
      this.addTruckValid = false;
    }
    else if(this.gar_truck.truck_type == null){
      this.addTruckValid = false;
    }
    else if(this.gar_truck.capacity == null){
      this.addTruckValid = false;
    }
    else if(this.gar_truck.image == null){
      this.addTruckValid = false;
    }
    else if(this.gar_truck.drivername == null){
      this.addTruckValid = false;
    }
    else{
      this.addTruckValid = true;
    }
  }

  //add truck through the modal
  addTruck(){
    this.checkAddTruValid();

    if(this.addTruckValid == true){
      // this.garbage_truck.push(this.gar_truck);
      // this.onCloseHandled();

      this.flashMessagesService.show('Garbage truck Added Successfully', { cssClass: 'alert alert-success', timeout: 5000 });

    }
    if(this.addTruckValid == false){
      //console.log("come");
      this.flashMessagesService.show('Please Fill all the fields*', { cssClass: 'alert alert-danger', timeout: 5000 });
    }
    
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

  //validate edit truck
  checkEditTruckValid(){
    if(this.gar_truck.truck_no == ""){
      this.editTruckValid = false;
    }
    else if(this.gar_truck.truck_type == ""){
      this.editTruckValid = false;
    }
    else if(this.gar_truck.capacity == ""){
      this.editTruckValid = false;
    }
    else if(this.gar_truck.drivername == ""){
      this.editTruckValid = false;
    }
    else{
      this.editTruckValid = true;

    }
  }

  //when click Edit driver on editing modal this works
  editTruckNow(mykey:any){

    console.log(this.gar_truck);



    //this.updt_driver_set.driver_id = this.driver_set.driver_id;
    this.updt_truck_set.truck_no = this.gar_truck.truck_no;
    this.updt_truck_set.truck_type = this.gar_truck.truck_type;
    this.updt_truck_set.capacity = this.gar_truck.capacity;
    //this.updt_truck_set.image = this.gar_truck.image;
    this.updt_truck_set.drivername = this.gar_truck.drivername;

    console.log('updt_set: ');
    console.log(this.updt_truck_set);

    this.checkEditTruckValid();
    if(this.editTruckValid == true){

      this.garbage_truck.update(mykey, this.gar_truck).then(console.log('done'));

      //this.driver_obj.push(this.driver_set).then(console.log('wade hari1'));
      console.log('updt_set: ');
  
      // this.driver_obj.update(this.updt_driver_set).then(console.log('wade hari'));
  
  
      this.succesModal();


    }
    if(this.editTruckValid == false){
      //console.log("come");
      this.flashMessagesService.show('Please Fill all the fields*', { cssClass: 'alert alert-danger', timeout: 5000 });
    }


   
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
    this.flashMessagesService.show('Garbage truck deleted Successfully', { cssClass: 'alert alert-success', timeout: 5000 });

  }

  //No button on Modal
  noDlttruck(){
    this.dsplay2='none';
  }

  // success notification
  succesModal(){
     this.dsplay='none';
    // this.display_success='block';
    this.flashMessagesService.show('Garbage truck edited Successfully', { cssClass: 'alert alert-success', timeout: 5000 });

  }


  //Close Success Modal
  closeSuccess(){
    this.display_success='none';
  }

  openViewtruck(truck_no: string) {
    this.dsplay3="block";
    this.view_truck_no = truck_no;
  }
  noViewtruck(){
    this.dsplay3='none';
  }
}
