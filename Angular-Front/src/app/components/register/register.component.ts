import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth.service'
import {enableProdMode} from '@angular/core';
enableProdMode();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email:String;
  password:String;

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  registerData(){
    const user = {
      email:this.email,
      password:this.password
    };
    this.authService.registerUser(user)

  }

}
