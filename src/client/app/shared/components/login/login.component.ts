import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserService } from '../../services/user/user.service';
import { LoginDetails } from '../../objects/account/login-details';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'ss-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginDetails: LoginDetails = new LoginDetails('', '');

  constructor(
    private dialogRef: MdDialogRef<LoginComponent>,
    private loginService: UserService,
    private router: Router) {
    this.loginService.loginSubscription((loginDetails) => {
      if (this.loginService.isLoggedIn()) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/crisis-center/admin';
        // Redirect the user
        this.router.navigate([redirect]);
      }
      this.dialogRef.close('SUCCESS');
    });
  }

  login() {
    this.loginService.logIn(this.loginDetails);
  }
}
