import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.css']
})
export class DoughnutchartComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels:string[] = ['High Level', 'Medium Level', 'Low Level'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  public chartColors: any[] = [
    {
      backgroundColor:["#16A085",
        "#DAF7A6",
        "#669612",
        ]
    }];

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor() { }

  ngOnInit() {
  }

}
