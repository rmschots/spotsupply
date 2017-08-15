import { Component, HostBinding } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-confirmation-info',
  templateUrl: 'confirmation-info.component.html',
  styleUrls: ['confirmation-info.component.css']
})
export class ConfirmationInfoComponent {

  @HostBinding('id') id = 'orderconfirmation-dialog';

  constructor(public dialogRef: MdDialogRef<ConfirmationInfoComponent>) {
  }
}
