import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { ProductsModel } from '../../../shared/framework/models/products.model';
import { RestGatewayService } from '../../../shared/services/gateway/rest-gateway.service';
import { UpdateProductType } from './update-product-type';
import { CreateProductType } from './create-product-type';

@Component({
  moduleId: module.id,
  selector: 'ss-create-product-type',
  templateUrl: 'app/admin/product-manager/create-product-type/create-update-product-type.component.html',
  styleUrls: ['app/admin/product-manager/create-product-type/create-update-product-type.component.css']
})
export class CreateUpdateProductTypeComponent {

  isCreate: boolean;

  constructor(@Inject(MD_DIALOG_DATA) public data: CreateProductType | UpdateProductType,
              private _restService: RestGatewayService,
              private _productsModel: ProductsModel,
              private _dialogRef: MdDialogRef<CreateUpdateProductTypeComponent>) {
    this.isCreate = this.data instanceof CreateProductType;
  }

  get productCategories() {
    return this._productsModel.productHierarchy$;
  }

  submit() {
    if (this.isCreate) {
      this._restService
        .post('/product/addProductType', this.data)
        .take(1)
        .subscribe(() => this._dialogRef.close(true));
    } else {
      this._restService
        .post('/product/updateProductType', this.data)
        .take(1)
        .subscribe(() => this._dialogRef.close(true));
    }
  }
}
