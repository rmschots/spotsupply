import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-confirmation-info',
  templateUrl: 'confirmation-info.component.html',
  styleUrls: ['confirmation-info.component.css']
})
export class ConfirmationInfoComponent {

  constructor(public dialogRef: MdDialogRef<ConfirmationInfoComponent>) {
  }
}
