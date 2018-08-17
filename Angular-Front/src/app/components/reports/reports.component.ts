import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import  * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import 'jspdf-autotable';
const now = new Date();

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  driver_details ='none';
  truck_details = 'none';  
  public myarr = [];

  public drivers_row = [];
  public trucks_row = [];
  public driver_obj:any;
  public truck_obj:any;
  
  size: number;
  download_pdf = '';
  private columns: { title: string; dataKey: string }[];
  private rows: any;
  

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.driver_obj = app.drivers;
    this.truck_obj = app.garbage_truck;
   }

  ngOnInit() {
    
    this.driver_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        this.drivers_row.push({"driver_name":element[i].name,"mobile_number":element[i].mobile_no,"truck_number":element[i].truck_no});
      }
    });
    this.truck_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        this.trucks_row.push({"truck_number":element[i].truck_no,"truck_type":element[i].truck_type,"capacity":element[i].truck_no,"assigned_driver":element[i].drivername});
      }
    });
    
  }

  // createPdf() {
  //   const doc = new jsPDF();
  //   doc.text("Some text here",10,10);
  //   doc.save("Test.pdf");

  // }

  //Generate drivers details
  generate_driver_details(){
    this.add_data_myarray(this.driver_obj);
    this.driver_details = 'block';  
    this.truck_details  = 'none';
    this.columns = [
      {title: "Driver Name", dataKey: "driver_name"},
      {title: "Mobile Number", dataKey: "mobile_number"},
      {title: "Truck Number", dataKey: "truck_number"},
    ];
    
    // for(let x of this.myarr){
    //   console.log(x[1].name);
    //  // this.rows.push({"driver_name":x[1].name,"mobile_number":x[1].mobile_no,"truck_number":x[1].truck_no});
    // }
    this.rows = this.drivers_row;
    
    this.download_pdf = "generate_driver_details.pdf";   

  }

  //Generate Truck details 
  generate_truck_details(){
    this.add_data_myarray(this.truck_obj);
    this.truck_details = 'block'; 
    this.driver_details = 'none'; 
    this.columns = [
      {title: "Truck Number", dataKey: "truck_number"},
      {title: "Truck Type", dataKey: "truck_type"},
      {title: "Capacity", dataKey: "capacity"},
      {title: "Assigned Driver", dataKey: "assigned_driver"},
    ];
    
    // for(let x of this.myarr){
    //   console.log(x[1].name);
    //  // this.rows.push({"driver_name":x[1].name,"mobile_number":x[1].mobile_no,"truck_number":x[1].truck_no});
    // }
    this.rows = this.trucks_row;
    
    this.download_pdf = "generate_truck_details.pdf";
  }

  // generateReport(title){
  //   const doc = new jsPDF();
  //   doc.autoTable(this.columns,this.rows,{
  //     margin: {top:35},
  //     addPageContent: function (data) {
  //       doc.text(title,50,20);
  //       doc.text("Issue Date : "+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate(),14,28,{
  //         fontSize: 4
  //       });
  //     }
  //   });
  //   //var img ='../../assets/images/background.jpg';
  //   //doc.addImage(img, 'JPEG', 15, 40, 180, 160)
  //   doc.save(this.download_pdf);
  // }

  add_data_myarray(database_object){
    this.myarr = [];
    database_object.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        this.myarr.push([i+1, element[i]]);
      }
    });


  }
}
