import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserService } from '../../services/user/user.service';
import { LoginDetails } from '../../objects/account/login-details';

@Component({
  moduleId: module.id,
  selector: 'ss-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginDetails: LoginDetails = new LoginDetails('', '');

  constructor(private dialogRef: MdDialogRef<LoginComponent>, private loginService: UserService) {
    this.loginService.loginSubscription((loginDetails) => {
      this.dialogRef.close('SUCCESS');
    });
  }

  login() {
    this.loginService.logIn(this.loginDetails);
  }
}
