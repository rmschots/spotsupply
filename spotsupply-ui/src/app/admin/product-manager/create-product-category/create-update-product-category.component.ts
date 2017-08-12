import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { CreateProductCategory } from './create-product-category';
import { UpdateProductCategory } from './update-product-category';
import { RestGatewayService } from '../../../shared/services/gateway/rest-gateway.service';

@Component({
  moduleId: module.id,
  selector: 'ss-create-update-product-category',
  templateUrl: 'create-update-product-category.component.html',
  styleUrls: ['create-update-product-category.component.css']
})
export class CreateUpdateProductCategoryComponent {

  isCreate: boolean;

  constructor(@Inject(MD_DIALOG_DATA) public data: CreateProductCategory | UpdateProductCategory,
              private _restService: RestGatewayService,
              private _dialogRef: MdDialogRef<CreateUpdateProductCategoryComponent>) {
    this.isCreate = this.data instanceof CreateProductCategory;
  }

  submit() {
    if (this.isCreate) {
      this._restService
        .post('/product/addProductCategory', this.data)
        .take(1)
        .subscribe(() => this._dialogRef.close(true));
    } else {
      this._restService
        .post('/product/updateProductCategory', this.data)
        .take(1)
        .subscribe(() => this._dialogRef.close(true));
    }
  }
}
