import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoginModel } from '../../framework/models/login.model';

@Component({
  moduleId: module.id,
  selector: 'ss-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['reset-password.component.css']
})
export class ResetPasswordComponent {

  emailAddress: string = '';
  errorMessage: string = null;
  success: boolean = null;

  constructor(private _dialogRef: MdDialogRef<ResetPasswordComponent>,
              private _loginModel: LoginModel) {
  }

  resetPassword() {
    this._loginModel.forgotPassword(this.emailAddress).take(1).subscribe(() => {
      this.success = true;
    }, (error: any) => {
      this.errorMessage = error.message;
    });
  }

  confirm() {
    this._dialogRef.close();
  }
}
