import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  driver_details ='none';  
  public myarr = [];
  public driver_obj:any;
  size: number;

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.driver_obj = app.drivers;
   }

  ngOnInit() {

    this.driver_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){

        console.log(element[i].level);
        this.myarr.push([i+1, element[i]]);


      }
    });
  }

  createPdf() {
    const doc = new jsPDF();
    doc.text("Some text here",10,10);
    doc.save("Test.pdf");

  }
  generate_driver_details(){
    this.driver_details = 'block';
       

  }
}
