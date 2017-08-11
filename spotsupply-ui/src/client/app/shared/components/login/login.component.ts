import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { LoginDetails } from '../../objects/account/login-details';
import { Router } from '@angular/router';
import { LoginModel } from '../../framework/models/login.model';
import { ResetPasswordComponent } from './reset-password.component';

@Component({
  moduleId: module.id,
  selector: 'ss-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginDetails: LoginDetails = new LoginDetails('', '');
  errorMessage: string = null;

  constructor(private _dialogRef: MdDialogRef<LoginComponent>,
              private _loginModel: LoginModel,
              private _router: Router,
              private _dialog: MdDialog) {
  }

  login() {
    this._loginModel.login(this.loginDetails).take(1).subscribe((success: boolean) => {
      let redirect = this._loginModel.redirectUrl ? this._loginModel.redirectUrl : '/';
      this._router.navigate([redirect]);
      this._dialogRef.close('SUCCESS');
    }, (error: any) => {
      this.errorMessage = error.message;
    });
  }

  forgotPassword() {
    this._dialog.open(ResetPasswordComponent);
  }
}
