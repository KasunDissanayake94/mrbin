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


  constructor(app:AppComponent) {
    //This Component get from the AppComponent
    this.feedback_obj = app.feedbck;
    this.solvedProb_obj = app.slvdfeedbck;
  }

  openResolve(rslv:any){
    this.display="block";

    this.feedback_obj.update(rslv.$key, {status:'Problem solved'}).then(console.log('solve una'));
    //this.feedback_obj.remove(rslv);

    //console.log(rslv1);
    //console.log(this.rslv);
    this.finalReslv(rslv);
  }

  finalReslv(rsl:any){
    this.solvedProb_obj.push(rsl).then(console.log('serama hariyoooo'));
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
      this.size = element.length;
      for (var i =0 ; i<this.size;i++){

        console.log(element[i].level);
        this.myarr.push([i+1, element[i]]);


      }
    });
  }

}
