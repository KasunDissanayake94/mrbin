import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import {$} from "protractor";
import { FlashMessagesService } from 'angular2-flash-messages';



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
  delete_item ='none';
  drivrid = '';

  
  addDriValid = true;
  editDriValid = true;

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

  constructor(app:AppComponent,
    private flashMessagesService: FlashMessagesService) {
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
    this.checkAddDriValid();
    if(this.addDriValid==true){
      this.driver_obj.push(this.driver_set);
      this.onCloseHandled();

      this.flashMessagesService.show('Driver Added Successfully', { cssClass: 'alert alert-success', timeout: 5000 });

    }
    if(this.addDriValid==false){
      //console.log("come");
      this.flashMessagesService.show('Please Fill all the fields*', { cssClass: 'alert alert-danger', timeout: 5000 });
    }
    
  }

  //check Validation in add driver function
  
  checkAddDriValid(){
    if(this.driver_set.name == null){
      this.addDriValid = false;
    }
    if(this.driver_set.mobile_no == null){
      this.addDriValid = false;
    }
    if(this.driver_set.truck_no == null){
      this.addDriValid = false;
    }
  }

  //check Validation in edit driver function
  
  checkEditDriValid(){
    if(this.driver_set.name == ""){
      this.editDriValid = false;
    }
    else if(this.driver_set.mobile_no == ""){
      this.editDriValid = false;
    }
    else if(this.driver_set.truck_no == ""){
      this.editDriValid = false;
    }else{
      this.editDriValid = true;

    }
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

    

    //console.log(this.driver_set);



    //this.updt_driver_set.driver_id = this.driver_set.driver_id;
    this.updt_driver_set.name = this.driver_set.name;
    this.updt_driver_set.mobile_no = this.driver_set.mobile_no;
    this.updt_driver_set.truck_no = this.driver_set.truck_no;

    console.log('updt_set: ');
    console.log(this.updt_driver_set);
    console.log('driver_set: ');
    console.log(this.driver_set);

    this.checkEditDriValid();
    if(this.editDriValid==true){
      this.driver_obj.update(mykey, this.updt_driver_set).then(console.log('wade hari1'));

      //this.driver_obj.push(this.driver_set).then(console.log('wade hari1'));
      console.log('updt_set: ');
      this.flashMessagesService.show('Driver updated successfully', { cssClass: 'alert alert-success', timeout: 5000 });
      this.onCloseEditDri();

    }
    if(this.editDriValid==false){
      //console.log("come");
      this.flashMessagesService.show('Please Fill all the fields*', { cssClass: 'alert alert-danger', timeout: 5000 });
    }

    

   // this.driver_obj.update(this.updt_driver_set).then(console.log('wade hari'));


    
  }

  // used to try xcept for update ------------------------

  openDltDri1(item:any){
    this.driver_obj.remove(item).then(console.log("Data Deleted"));

  }


  // Delete driver modal here ------------------------

  openDltDri(item:any){
    this.delete_item = item[1].$key;
    this.dsplay2="block";
  }
  //Yes button on Modal
  yesDltDri(){
    this.driver_obj.remove(this.delete_item).then(console.log("Data Deleted"));
    this.dsplay2='none';
    this.flashMessagesService.show('Driver deleted successfully', { cssClass: 'alert alert-success', timeout: 5000 });

  }

  //No button on Modal
  noDltDri(){
    this.dsplay2='none';
  }

  ngOnInit() {
    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.driver_obj.forEach(element => {
      this.size = element.length;
      this.myarr=[];
      for (var i =0 ; i<this.size;i++){

        console.log(element[i].level);
        this.myarr.push([i+1, element[i]]);


      }
    });

    console.log(this.myarr);
  }

}
