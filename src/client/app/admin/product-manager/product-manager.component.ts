import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductsModel } from '../../shared/framework/models/products.model';
import { MdButtonToggleGroup, MdDialog } from '@angular/material';
import { CreateUpdateProductComponent } from './create-product/create-update-product.component';
import { ProductCategory } from '../../shared/objects/product/product-category';
import { ProductType } from '../../shared/objects/product/product-type';
import { Unsubscribable } from '../../shared/components/unsubscribable';
import { CreateProductTypeComponent } from './create-product-type/create-product-type.component';
import { CreateProductCategoryComponent } from './create-product-category/create-product-category.component';
import { CreateProduct } from './create-product/create-product';
import { Product } from '../../shared/objects/product/product';
import { UpdateProduct } from './create-product/update-product';

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
              private _dialog: MdDialog) {
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

  updateProduct(product: Product) {
    let dialogRef = this._dialog.open(CreateUpdateProductComponent,
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

  addProduct(type: ProductType) {
    let dialogRef = this._dialog.open(CreateUpdateProductComponent, { data: new CreateProduct(type) });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  addType(category: ProductCategory) {
    let dialogRef = this._dialog.open(CreateProductTypeComponent, { data: category });
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }

  addCategory() {
    let dialogRef = this._dialog.open(CreateProductCategoryComponent);
    dialogRef.afterClosed().take(1).subscribe(result => {
      if (result) {
        this._productsModel.invalidate();
      }
    });
  }
}
