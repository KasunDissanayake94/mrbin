import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-userloggedinnavbar',
  templateUrl: './userloggedinnavbar.component.html',
  styleUrls: ['./userloggedinnavbar.component.css']
})
export class UserloggedinnavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  logoutbtn(){
    this.authService.logout();

  }



  ngOnInit() {
  }

}

