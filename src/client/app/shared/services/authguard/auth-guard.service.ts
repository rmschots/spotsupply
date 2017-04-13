import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MdDialog } from '@angular/material';
import { LoginOptionsComponent } from '../../components/login/login-options.component';
import { LoginModel } from '../../framework/models/login.model';

@Injectable()
export class AuthGuard implements CanActivate {

  private _loggedIn = false;

  constructor(private _loginModel: LoginModel, private dialog: MdDialog) {
    this._loginModel.loginUser$.subscribe(() => {
      this._loggedIn = true;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    if (this._loggedIn) {
      return true;
    }
    this._loginModel.redirectUrl = state.url;

    this.dialog.open(LoginOptionsComponent);
    return false;
  }
}
