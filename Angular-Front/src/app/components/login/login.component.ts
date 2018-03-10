import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router,private _flashMessagesService: FlashMessagesService) {
  }




  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['userhome']);

      })

  }




  signInWithEmail() {


    this.authService.signInRegular(this.user.email, this.user.password)

      .then((res) => {
        this.router.navigate(['userhome']);
        this._flashMessagesService.show('Loggin Success!', { cssClass: 'alert-success', timeout: 5000 });

      });


  }



  ngOnInit() {
  }

}
