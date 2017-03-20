import { Injectable } from '@angular/core';
import { LoginDetails } from '../../objects/account/login-details';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  redirectUrl: string;

  private loggedIn: boolean = false;
  private loginDetails: LoginDetails = null;
  private loginSubject = new Subject<LoginDetails>();

  constructor(private router: Router) {
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logIn(loginDetails: LoginDetails) {
    // TODO: login here
    this.loginDetails = loginDetails;
    this.loggedIn = true;
    this.loginSubject.next(loginDetails);
  }

  logOut() {
    // TODO: logout here
    this.loggedIn = false;
    this.loginDetails = null;
    this.router.navigate(['']);
    this.loginSubject.next(this.loginDetails);
  }

  loginSubscription(obs: ((value: LoginDetails) => void)) {
    this.loginSubject.subscribe(obs);
  }
}

