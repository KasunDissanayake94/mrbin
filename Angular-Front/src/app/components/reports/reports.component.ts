import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import  * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import 'jspdf-autotable';
import { Headers , Http } from '@angular/http';
import 'rxjs/add/operator/map';
const now = new Date();

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  driver_details ='none';
  truck_details = 'none';
  anual_details = 'none';
  five_years_details = 'none';
  public myarr = [];

  public drivers_row = [];
  public trucks_row = [];
  public annual_data = [];
  public five_year_data = [];
  public driver_obj:any;
  public truck_obj:any;

  size: number;
  download_pdf = '';
  private columns: { title: string; dataKey: string }[];
  private rows: any;

  public jan = 0;
  public feb = 0;
  public mar = 0;
  public apr = 0;
  public may = 0;
  public jun = 0;
  public jul = 0;
  public aug = 0;
  public sep = 0;
  public oct = 0;
  public nov = 0;
  public dec = 0;

  public annual_collection = 0;
  public five_years_back_collection = 0;
  public four_years_back_collection = 0;
  public three_years_back_collection = 0;
  public two_years_back_collection = 0;
  public one_year_back_collection = 0;


  constructor(private http:Http,app:AppComponent) {
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
    this.anual_details = 'none';
    this.five_years_details = 'none';
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
    this.anual_details = 'none';
    this.five_years_details = 'none';
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

  generateReport(title){
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

  add_data_myarray(database_object){
    this.myarr = [];
    database_object.forEach(element => {
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){
        this.myarr.push([i+1, element[i]]);
      }
    });
  }
  //Generate annual reports
  generate_annual_report(){
    this.anual_details = 'block';
    this.driver_details = 'none';
    this.five_years_details = 'none';
    this.truck_details = 'none';
    let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.post('http://localhost:3000/reports/annual_report',  {headers: headers}).map(response => response.json())
            .subscribe((data) => {
                        this.jan = data.m_1;
                        this.feb = data.m_2;
                        this.mar = data.m_3;
                        this.apr = data.m_4;
                        this.may = data.m_5;
                        this.jun = data.m_6;
                        this.jul = data.m_7;
                        this.aug = data.m_8;
                        this.sep = data.m_9;
                        this.oct = data.m_10;
                        this.nov = data.m_11;
                        this.dec = data.m_12;
            });
            this.columns = [
              {title: "Month", dataKey: "month"},
              {title: "Garbage Collection(Ton)", dataKey: "garbage_cap"},

            ];

            this.download_pdf = "annual_collection_details.pdf";
  }

  get_rows(title){
    this.rows = [
      {"month": "January", "garbage_cap": this.jan},
      {"month": "February", "garbage_cap": this.feb},
      {"month": "March", "garbage_cap": this.mar},
      {"month": "April", "garbage_cap": this.apr},
      {"month": "May", "garbage_cap": this.may},
      {"month": "June", "garbage_cap": this.jun},
      {"month": "July", "garbage_cap": this.jul},
      {"month": "August", "garbage_cap": this.aug},
      {"month": "September", "garbage_cap": this.sep},
      {"month": "October", "garbage_cap": this.oct},
      {"month": "November", "garbage_cap": this.nov},
      {"month": "December", "garbage_cap": this.dec},
    ];
    this.generateReport(title);
  }
  generate_five_years_report(){
    this.anual_details = 'none';
    this.driver_details = 'none';
    this.truck_details = 'none';
    this.five_years_details = 'block';

    let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.post('http://localhost:3000/reports/last_five_details',  {headers: headers}).map(response => response.json())
            .subscribe((data) => {
                        this.annual_collection = data.current;
                        this.five_years_back_collection = data.five;
                        this.four_years_back_collection = data.four;
                        this.three_years_back_collection = data.three;
                        this.two_years_back_collection = data.two;
                        this.one_year_back_collection = data.one;

            });
            this.columns = [
              {title: "Year", dataKey: "year"},
              {title: "Garbage Collection(Ton)", dataKey: "garbage_cap"},

            ];

            this.download_pdf = "last_five_years_collection_details.pdf";
  }
  get_last_five_rows(title){
    this.rows = [
      {"year": "2013", "garbage_cap": this.five_years_back_collection},
      {"year": "2014", "garbage_cap": this.four_years_back_collection},
      {"year": "2015", "garbage_cap": this.three_years_back_collection},
      {"year": "2016", "garbage_cap": this.two_years_back_collection},
      {"year": "2017", "garbage_cap": this.one_year_back_collection},
      {"year": "2018", "garbage_cap": this.annual_collection},

    ];
    this.generateReport(title);
  }
}
