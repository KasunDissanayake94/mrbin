import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  lastCollected:number;
  todayCollect : number;
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

  ngOnInit() {

    this.lastCollected = this.lastCollected+this.todayCollect;
    this.todayCollect =0;

    

  }

  collectIt(amount : number){
    this.todayCollect = amount;
    

  }

}
