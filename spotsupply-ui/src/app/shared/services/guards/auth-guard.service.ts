import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MdDialog } from '@angular/material';
import { LoginOptionsComponent } from '../../components/login/login-options.component';
import { LoginModel } from '../../framework/models/login.model';
import { DataStatus } from '../gateway/data-status';

@Injectable()
export class AuthGuard implements CanActivate {

  private _loggedIn = false;

  constructor(private _loginModel: LoginModel, private dialog: MdDialog) {
    this._loginModel.loginAvailable$.map(loginAvailable => {
      return loginAvailable === DataStatus.AVAILABLE;
    }).subscribe(loggedIn => {
      this._loggedIn = loggedIn;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._loginModel.loginAvailable$
      .filter(loginAvailable => {
        return [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(loginAvailable);
      })
      .map(loginAvailable => {
        if (loginAvailable === DataStatus.AVAILABLE) {
          return true;
        }
        this._loginModel.redirectUrl = state.url;
        this.dialog.open(LoginOptionsComponent);
        return false;
      });
  }
}
