import { Component, Input } from '@angular/core';
import { ProductCategory } from '../../objects/product/product-category';
import { Product } from '../../objects/product/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ProductsModel } from '../../framework/models/products.model';

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

  constructor(private shoppingCartService: ShoppingCartService,
              private _productsModel: ProductsModel) {
    _productsModel.loadProductHierarchy();
    _productsModel.productHierarchy$.subscribe(productHierarchy => {
      this.categories = productHierarchy;
    });
  }

  tabSelected(tabIndex: any) {
    this.selectedTabIndex = tabIndex;
  }

  tabSwiped(event: any) {
    if (event.direction === 2) {
      if (this.selectedTabIndex + 1 < this.categories.length) {
        this.tabSelected(this.selectedTabIndex + 1);
      }
    } else if (event.direction === 4) {
      if (this.selectedTabIndex > 0) {
        this.tabSelected(this.selectedTabIndex - 1);
      }
    }
  }

  addProduct(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  removeProduct(product: Product) {
    this.shoppingCartService.removeProduct(product);
  }

  getProductAmount(product: Product): number {
    return this.shoppingCartService.getProductAmount(product);
  }
}
