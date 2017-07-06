import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-create-product-type',
  templateUrl: 'create-product-type.component.html',
  styleUrls: ['create-product-type.component.css']
})
export class CreateProductTypeComponent {

  constructor(public dialogRef: MdDialogRef<CreateProductTypeComponent>, public dialog: MdDialog) {

  }
}
