import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  display='none';
  constructor() { }
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
