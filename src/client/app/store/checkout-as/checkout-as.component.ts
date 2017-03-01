import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-checkout-as',
  templateUrl: 'checkout-as.component.html',
  styleUrls: ['checkout-as.component.css']
})
export class CheckoutAsComponent {

  constructor(public dialogRef: MdDialogRef<CheckoutAsComponent>) {
  }
}
