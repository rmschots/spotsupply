import { Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { LoginComponent } from '../../shared/components/login/login.component';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'ss-checkout-as',
  templateUrl: 'checkout-as.component.html',
  styleUrls: ['checkout-as.component.css']
})
export class CheckoutAsComponent {

  constructor(public dialogRef: MdDialogRef<CheckoutAsComponent>, public dialog: MdDialog) {
  }

  openLoginDialog() {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SUCCESS') {
        this.dialogRef.close('SUCCESS');
      }
    });
  }
}
