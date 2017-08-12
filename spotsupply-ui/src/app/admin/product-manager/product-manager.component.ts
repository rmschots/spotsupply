import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductsModel } from '../../shared/framework/models/products.model';
import { MdButtonToggleGroup, MdDialog } from '@angular/material';
import { CreateUpdateProductComponent } from './create-product/create-update-product.component';
import { ProductCategory } from '../../shared/objects/product/product-category';
import { ProductType } from '../../shared/objects/product/product-type';
import { Unsubscribable } from '../../shared/components/unsubscribable';
import { CreateUpdateProductTypeComponent } from './create-product-type/create-update-product-type.component';
import { CreateProduct } from './create-product/create-product';
import { Product } from '../../shared/objects/product/product';
import { UpdateProduct } from './create-product/update-product';
import { CreateProductType } from './create-product-type/create-product-type';
import { UpdateProductType } from './create-product-type/update-product-type';
import { RestGatewayService } from '../../shared/services/gateway/rest-gateway.service';
import { URLSearchParams } from '@angular/http';
import { CreateProductCategory } from './create-product-category/create-product-category';
import { UpdateProductCategory } from './create-product-category/update-product-category';
import { CreateUpdateProductCategoryComponent } from './create-product-category/create-update-product-category.component';

@Component({
  moduleId: module.id,
  selector: 'ss-product-manager',
  templateUrl: 'product-manager.component.html',
  styleUrls: ['product-manager.component.css']
})
export class ProductManagerComponent extends Unsubscribable implements AfterViewInit {

  @ViewChild('selectedCategory') selectedCategory: MdButtonToggleGroup;
  @ViewChild('selectedType') selectedType: MdButtonToggleGroup;
  @ViewChild('selectedProduct') selectedProduct: MdButtonToggleGroup;

  constructor(private _productsModel: ProductsModel,
              private _dialog: MdDialog,
              private _restService: RestGatewayService) {
    super();
  }

  ngAfterViewInit(): void {
    this._productsModel.productHierarchy$
      .distinctUntilChanged().takeUntil(this._ngUnsubscribe$).subscribe(() => {
      this.selectedProduct.value = this.selectedType.value = this.selectedCategory.value = null;
    });
  }

  get productCategories() {
    return this._productsModel.productHierarchy$;
  }

  get untypedProducts() {
    return this._productsModel.untypedProducts$;
  }

  addProduct(type: ProductType) {
    const dialogRef = this._dialog.open(CreateUpdateProductComponent, { data: new CreateProduct(type) });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  updateProduct(product: Product) {
    const dialogRef = this._dialog.open(CreateUpdateProductComponent,
      {
        data: new UpdateProduct(product, this._productsModel.productTypeMap$.value.get(product.id))
      }
    );
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  addType(category: ProductCategory) {
    const dialogRef = this._dialog.open(CreateUpdateProductTypeComponent, { data: new CreateProductType(category) });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  updateType(type: ProductType, category: ProductCategory) {
    const dialogRef = this._dialog.open(CreateUpdateProductTypeComponent, { data: new UpdateProductType(type, category) });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  deleteType(type: ProductType) {
    const params = new URLSearchParams();
    params.set('productTypeId', '' + type.id);
    this._restService
      .doDelete('/product/deleteProductType', params)
      .take(1)
      .subscribe(() => this._productsModel.invalidate());
  }

  addCategory() {
    const dialogRef = this._dialog.open(CreateUpdateProductCategoryComponent, { data: new CreateProductCategory() });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  updateCategory(category: ProductCategory) {
    const dialogRef = this._dialog.open(CreateUpdateProductCategoryComponent, { data: new UpdateProductCategory(category) });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  deleteCategory(category: ProductCategory) {
    const params = new URLSearchParams();
    params.set('productCategoryId', '' + category.id);
    this._restService
      .doDelete('/product/deleteProductCategory', params)
      .take(1)
      .subscribe(() => this._productsModel.invalidate());
  }
}
