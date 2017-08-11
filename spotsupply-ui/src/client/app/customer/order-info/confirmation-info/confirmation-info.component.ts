import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-confirmation-info',
  templateUrl: 'app/customer/order-info/confirmation-info/confirmation-info.component.html',
  styleUrls: ['app/customer/order-info/confirmation-info/confirmation-info.component.css']
})
export class ConfirmationInfoComponent {

  constructor(public dialogRef: MdDialogRef<ConfirmationInfoComponent>) {
  }
}
