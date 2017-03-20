import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';
import { MdDialog } from '@angular/material';
import { LoginOptionsComponent } from '../../components/login/login-options.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private dialog: MdDialog) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.userService.redirectUrl = state.url;

    this.dialog.open(LoginOptionsComponent);
    return false;
  }
}
