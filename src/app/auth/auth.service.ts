//This service allows to fake a user login. Inform the parts of the application about login
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>(); //Whenever a user is registered, an event is emitted
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    //This method should be called when a user signs up
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessful();
  }

  login(authData: AuthData) {
    //This method should be called when a user signs in
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessful();
  }

  logout() {
    this.user = null;
    this.authChange.next(false); //Subcribers get this value when the user is logged out successfully
    this.router.navigate(['/login']); //After user is logged out, that user is navigated to login page
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessful() {
    //There is some redundant lines of code in registerUser and login methods. So to avoid DRY, this method is created and called inside both the methods
    this.authChange.next(true); //Subcribers get this value when the user is logged in successfully
    this.router.navigate(['/training']); //After user is logged in, that user is navigated to training
  }
}
