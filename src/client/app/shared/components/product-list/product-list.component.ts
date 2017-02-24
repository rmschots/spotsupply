import { Component, Input } from '@angular/core';
import { ProductCategory } from '../../objects/product/product-category';
import { ProductType } from '../../objects/product/product-type';
import { Product } from '../../objects/product/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';

@Component({
  moduleId: module.id,
  selector: 'ss-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent {

  @Input() shop: boolean;

  selectedTabIndex: number = 0;
  categories: ProductCategory[] = this.getCategories();

  constructor(private shoppingCartService: ShoppingCartService) {

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

  private getCategories(): ProductCategory[] {
    return [
      new ProductCategory('Top sellers', [
        new ProductType(1, 'Top sellers', false, [
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(6, 'Smos cheese', 'cheese, vegetables', 3.5),
          new Product(8, 'Calippo Orange', '', 1)
        ])
      ]),
      new ProductCategory('Drinks', [
        new ProductType(2, 'Soft drinks', true, [
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5),
          new Product(1, 'Coca Cola', '33cl', 2.5),
          new Product(2, 'Coca Cola Zero', '33cl', 2.5)
        ]),
        new ProductType(3, 'Beers', true, [
          new Product(3, 'Jupiler', '25cl', 2),
          new Product(4, 'Jupiler', '33cl', 2.5)
        ])
      ]),
      new ProductCategory('Snacks', [
        new ProductType(4, 'Sandwiches', true, [
          new Product(5, 'Smos', 'cheese, ham, vegetables', 3.5),
          new Product(6, 'Smos cheese', 'cheese, vegetables', 3.5)
        ]),
        new ProductType(5, 'Ice cream', true, [
          new Product(7, 'Calippo Cola', '', 1),
          new Product(8, 'Calippo Orange', '', 1)
        ])
      ])
    ];
  }

}
