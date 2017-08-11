import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { RestGatewayService } from '../../../shared/services/gateway/rest-gateway.service';
import { CreateProduct } from './create-product';
import { ProductsModel } from '../../../shared/framework/models/products.model';
import { UpdateProduct } from './update-product';

@Component({
  moduleId: module.id,
  selector: 'ss-create-update-product',
  templateUrl: 'app/admin/product-manager/create-product/create-update-product.component.html',
  styleUrls: ['app/admin/product-manager/create-product/create-update-product.component.css']
})
export class CreateUpdateProductComponent {

  isCreate: boolean;

  constructor(@Inject(MD_DIALOG_DATA) public data: CreateProduct | UpdateProduct,
              private _restService: RestGatewayService,
              private _productsModel: ProductsModel,
              private dialogRef: MdDialogRef<CreateUpdateProductComponent>) {
    this.isCreate = this.data instanceof CreateProduct;
  }

  get productTypes() {
    return this._productsModel.productHierarchy$.map(cats => {
      return [].concat.apply([], cats.map(cat => cat.types));
    });
  }

  submit() {
    if (this.isCreate) {
      this._restService
        .post('/product/addProduct', this.data)
        .take(1)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this._restService
        .post('/product/updateProduct', this.data)
        .take(1)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}
