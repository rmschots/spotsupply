import { Component, ViewChild } from '@angular/core';
import { ProductsModel } from '../../shared/framework/models/products.model';
import { MdButtonToggleGroup } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'ss-product-manager',
  templateUrl: 'product-manager.component.html',
  styleUrls: ['product-manager.component.css']
})
export class ProductManagerComponent {

  @ViewChild('selectedCategory') selectedCategory: MdButtonToggleGroup;
  @ViewChild('selectedType') selectedType: MdButtonToggleGroup;
  @ViewChild('selectedProduct') selectedProduct: MdButtonToggleGroup;

  constructor(private _productsModel: ProductsModel) {
    console.log('product manager');
  }

  get productCategories() {
    return this._productsModel.productHierarchy$;
  }
}
