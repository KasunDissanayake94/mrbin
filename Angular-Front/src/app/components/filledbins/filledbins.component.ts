import {Component, OnInit} from '@angular/core';
import { AppComponent } from '../../app.component';
import { GeoService } from '../../service/geo.service'
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
  public app_users: any;

  lat_location: number ;
  lng_location: number ;
  zoom: number= 15;

  //inorder to take size and store on on arrAY
  size: number;
  temp: number;
  public myarr=[];


  display='none';
  dsply = 'none';
  dsply2 = 'none';
  dsply4 = 'none';
  dsplay5 = 'none';
  delete_item ='none';
  rel_user ='none';


  bin = {
    //bin_id: '',
    user_id: '',
    description: '',
    location: {
      lon:'',
      lat:'',
      priority:1
    },
    //level: 'low'
    level: 1

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
    this.app_users = app.appusrobj;
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
    this.temp= Number(this.bin.location.priority);

    this.bin.location.priority = this.temp;
    console.log(this.bin);
    this.onCloseHandled();

    this.req_bin_obj.update(this.bin.user_id, {status: 'solved'});
    let binId = this.bin_obj.push(this.bin).key;

   // console.log("-"+binId);
    //this.bin_obj.update(binId, {user_id: this.req_bin_obj.$key});

    this.app_users.update(this.bin.user_id, {bin_id: binId});


  }
  //Showing the Actual Location of the bin
  showLocation(lat,lon){
    this.dsply4="block";
    this.lat_location = lat;
    this.lng_location = lon;

}
closeshowLocation(){
  this.dsply4='none';
}


  //After Clicking Assign a driver this Model will be called
  openAssign(item:any){
    this.dsply="block";

    //this.bin.bin_id = item.$key;
    this.bin.location = item[1].location;

    this.assigned_drivers1.location = item[1].description;
    this.assigned_drivers1.assigned_dri_id = null;
    this.assigned_drivers1.bin_id = item[1].$key;

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


  //After Clicking delete a relevant bin  this Model will be called
  openDltBin(item:any){
    this.rel_user = item[1].user_id;
    
    this.delete_item = item[1].$key;
    this.dsplay5="block";
  }

  //Yes button on Modal
  yesDltDri(){
    this.deleteBinfrmUser();
    this.bin_obj.remove(this.delete_item).then(console.log("Data Deleted"));

    this.delete_item = 'none';
    this.dsplay5='none';
  }

  //No button on Modal
  noDltDri(){
    this.delete_item = 'none';
    this.dsplay5='none';
  }

  deleteBinfrmUser(){
    // this.app_users.update(this.bin.user_id, {bin_id: null});
    this.app_users.remove(this.rel_user).then(console.log("Data Deleted"));
    this.req_bin_obj.remove(this.rel_user).then(console.log("Data Deleted"));

  }



  ngOnInit() {


    //Check each and every bin in the system and if garbage level is high it shows in the map
    this.bin_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){

          console.log(element[i].level);
          this.myarr.push([i+1, element[i]]);


      }
    });

    console.log(this.myarr);


  }
  autoCompleteCallback1(selectedData:any) {
    //do any necessery stuff.
  }



}
