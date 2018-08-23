import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-customer-feedback-report',
  templateUrl: './customer-feedback-report.component.html',
  styleUrls: ['./customer-feedback-report.component.css']
})
export class CustomerFeedbackReportComponent implements OnInit {

  public feedback_obj:any;
  public solvedProb_obj:any;
  display='none';
  display2='none';

  //inorder to take size and store on on arrAY
  size: number;
  public myarr=[];

  solved_prob = {
    date_of_feedback: '',
    feedback: '',
    status: '',
    subject: '',
    user_id: ''
  };

  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.feedback_obj = app.feedbck;
    this.solvedProb_obj = app.slvdfeedbck;



  }

  openResolve(rslv:any){
    this.display="block";

    this.feedback_obj.update(rslv[1].$key, {status:'Problem solved'}).then(console.log('solve una'));
    //this.updtkey = this.feedback_obj.select(rslv[1].$key);

    this.feedback_obj.remove(rslv[1]);

    this.solved_prob.date_of_feedback = rslv[1].date_of_feedback;
    this.solved_prob.feedback = rslv[1].feedback;
    this.solved_prob.status = "problem solved";
    this.solved_prob.subject = rslv[1].subject;
    this.solved_prob.user_id = rslv[1].user_id;

    //console.log(this.rslv);
    this.finalReslv(this.solved_prob);
  }

  finalReslv(rsl:any){

    this.solvedProb_obj.push(rsl).then(console.log('Done'));
    console.log(rsl);


  }
  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  //view Resolved problems

  showResolved(){
    this.display2="block";
  }
  closeResolved(){
    this.display2="none";
  }



  ngOnInit() {
    //Check each and every bin in the system and if garbage level is high it shows in the map

    this.feedback_obj.forEach(element => {
      this.myarr = [];
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){

        console.log(element[i].level);
        this.myarr.push([i+1, element[i]]);


      }
    });
  }

}
