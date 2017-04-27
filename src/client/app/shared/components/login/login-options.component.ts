import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'ss-login-options',
  templateUrl: 'login-options.component.html',
  styleUrls: ['login-options.component.css']
})
export class LoginOptionsComponent {

  constructor(public dialogRef: MdDialogRef<LoginOptionsComponent>, public dialog: MdDialog, private router: Router) {
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result === 'SUCCESS') {
        this.dialogRef.close('SUCCESS');
      }
    });
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
    this.dialogRef.close('SUCCESS');
  }
}
