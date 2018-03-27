import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-customer-feedback-report',
  templateUrl: './customer-feedback-report.component.html',
  styleUrls: ['./customer-feedback-report.component.css']
})
export class CustomerFeedbackReportComponent implements OnInit {

  public feedback_obj:any;
  display='none';

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.feedback_obj = app.feedbck;
  }

  openResolve(){
    this.display="block";
  }
  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }



  ngOnInit() {
  }

}
