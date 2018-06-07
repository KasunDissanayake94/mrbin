import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  display='none';
  dsplay2='none';
  public contact_obj: any;

  contact_set = {
    name : '',
    email : '',
    message:'',
  }

  constructor(app:AppComponent) {
    this.contact_obj = app.contact_obj;
  }

  ngOnInit() {

  }

//Add Modal here -------------------------

  openModal(){
    this.contact_set.name = null;
    this.contact_set.email = null;
    this.contact_set.message = null;
    this.display="block";
  }


  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  addContact(){
    this.contact_obj.push(this.contact_set);
    this.onClose();
  }
// close the modal once the submit button is pressed
  onClose(){
    this.display = 'none';
    // this.dsplay2 ='block';
    this.succesModal();




  }

  // add success modal
  succesModal(){
    this.dsplay2='block';

  }

  //Close Success Modal
  closeSuccess(){
    this.dsplay2='none';
  }
}
