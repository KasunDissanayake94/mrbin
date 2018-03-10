import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }




  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.router.navigate(['userhome'])
      })
      .catch((err) => console.log(err));
  }

  getName(){

    return this.user.email;
  }



  signInWithEmail() {


    this.authService.signInRegular(this.user.email, this.user.password)

      .then((res) => {
        console.log(res);
        this.router.navigate(['userhome']);
        console.log(this.user.email);
        console.log(this.user.password);
      })

      .catch((err) => console.log('error: ' + err));
  }



  ngOnInit() {
  }

}
