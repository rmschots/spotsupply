import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-create-product-category',
  templateUrl: 'create-product-category.component.html',
  styleUrls: ['create-product-category.component.css']
})
export class CreateProductCategoryComponent {

  constructor(public dialogRef: MdDialogRef<CreateProductCategoryComponent>, public dialog: MdDialog) {

  }
}
