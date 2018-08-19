import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  


  //public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  /**
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  
  **/

 monthCollection = {
  January:50,
  February:45,
  March:67,
  April:55,
  May:52,
  June:50,
  July:50,
  August:40,
  September:0,
  October:0,
  November:0,
  December:0
};

 public barChartData:any[] = [
  //{data: [65], label: 'January'}
  {data: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75], label : 'Max Amount'},
  {data: [65, 25, 45, 70, 56, 65, 65, 25, 0, 0, 0, 0], label : 'Collected Amount'}
  
];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  constructor() { }

  ngOnInit() {
  }

}
