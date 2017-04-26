import { Component, Input } from '@angular/core';
import { ProductCategory } from '../../objects/product/product-category';
import { Product } from '../../objects/product/product';
import { ProductsModel } from '../../framework/models/products.model';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';

@Component({
  moduleId: module.id,
  selector: 'ss-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent {

  @Input() shop: boolean;

  selectedTabIndex: number = 0;
  categories: ProductCategory[] = [];

  constructor(private _productsModel: ProductsModel,
              private _shoppingCartModel: ShoppingCartModel) {
    _productsModel.productHierarchy$.subscribe(productHierarchy => {
      this.categories = productHierarchy;
    });
  }

  tabSelected(tabIndex: any) {
    this.selectedTabIndex = tabIndex;
  }

  addProduct(product: Product) {
    this._shoppingCartModel.addProduct(product);
  }

  removeProduct(product: Product) {
    if (this.getProductAmount(product) > 0) {
      this._shoppingCartModel.removeProduct(product);
    }
  }

  getProductAmount(product: Product): number {
    return this._shoppingCartModel.getProductAmount(product);
  }
}
