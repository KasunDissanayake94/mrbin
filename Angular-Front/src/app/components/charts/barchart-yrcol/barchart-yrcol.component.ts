import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart-yrcol',
  templateUrl: './barchart-yrcol.component.html',
  styleUrls: ['./barchart-yrcol.component.css']
})
export class BarchartYrcolComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };




  public barChartLabels:string[] = ['2013', '2014', '2015', '2016', '2017'];

  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;


  public barChartData:any[] = [

    {data: [465, 470, 456, 500, 486], label : 'Collected Amount'}

  ];
  public chartColors: any[] = [
    {
      backgroundColor:["#138D75",
        "#138D75",
        "#138D75",
        "#138D75",
        "#138D75",
        "#138D75",
        "#138D75"]
    }];

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
