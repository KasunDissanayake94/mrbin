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
  public myarr = [];
  public drivers_row = [];
  public driver_obj:any;
  size: number;
  download_pdf = '';
  private columns: { title: string; dataKey: string }[];
  private rows: any;
  

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.driver_obj = app.drivers;
   }

  ngOnInit() {

    this.driver_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        this.myarr.push([i+1, element[i]]);
      }
    });
    this.driver_obj.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        this.drivers_row.push({"driver_name":element[i].name,"mobile_number":element[i].mobile_no,"truck_number":element[i].truck_no});
      }
    });
    
  }

  // createPdf() {
  //   const doc = new jsPDF();
  //   doc.text("Some text here",10,10);
  //   doc.save("Test.pdf");

  // }
  generate_driver_details(){
    this.driver_details = 'block';  
    this.columns = [
      {title: "Driver Name", dataKey: "driver_name"},
      {title: "Mobile Number", dataKey: "mobile_number"},
      {title: "Truck Number", dataKey: "truck_number"},
    ];
    var count = 0;
    console.log(this.drivers_row);
    
    // for(let x of this.myarr){
    //   console.log(x[1].name);
    //  // this.rows.push({"driver_name":x[1].name,"mobile_number":x[1].mobile_no,"truck_number":x[1].truck_no});
    // }
    this.rows = this.drivers_row;
    
    this.download_pdf = "generate_driver_details.pdf";   

  }

  generateReport(title){
    console.log("come to the loop");
    const doc = new jsPDF();
    doc.autoTable(this.columns,this.rows,{
      margin: {top:35},
      addPageContent: function (data) {
        doc.text(title,50,20);
        doc.text("Issue Date : "+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate(),14,28,{
          fontSize: 4
        });
      }
    });
    //var img ='../../assets/images/background.jpg';
    //doc.addImage(img, 'JPEG', 15, 40, 180, 160)
    doc.save(this.download_pdf);
  }
}
