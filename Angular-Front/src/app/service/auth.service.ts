import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  user:any;
  constructor() { }

  registerUser(user){
    console.log(user);
  }

}
