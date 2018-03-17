import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-filledbins',
  templateUrl: './filledbins.component.html',
  styleUrls: ['./filledbins.component.css']
})
export class FilledbinsComponent implements OnInit {
  public bin_obj:any;
  display='none';

  constructor(app:AppComponent) {
    //This component get from the AppComponent
    this.bin_obj = app.bins;
  }

  //After Clicking Add Bin Button this Model will be called
  openmyModal(){
    this.display="block";
  }
  //Close button on Modal
  onCloseHandled(){
    this.display='none';
  }

  ngOnInit() {
  }

}
