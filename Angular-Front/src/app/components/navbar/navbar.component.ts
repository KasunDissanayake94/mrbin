import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';
import {logging} from "selenium-webdriver";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title = 'app works!';


  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  logoutbtn(){
    this.authService.logout();

  }
  ngOnInit() {
  }

}
