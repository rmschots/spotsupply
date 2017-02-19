import { Component, Input } from '@angular/core';
import { ProductCategory } from '../../objects/product/product-category';
import { ProductType } from '../../objects/product/product-type';
import { Product } from '../../objects/product/product';

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

  private getCategories(): ProductCategory[] {
    return [
      new ProductCategory('Top sellers', [
        new ProductType('Top sellers', false, [
          new Product('Coca Cola', '33cl', 2.5),
          new Product('Coca Cola Zero', '33cl', 2.5),
          new Product('Smos cheese', 'cheese, vegetables', 3.5),
          new Product('Calippo Orange', '', 1)
        ])
      ]),
      new ProductCategory('Drinks', [
        new ProductType('Soft drinks', true, [
          new Product('Coca Cola', '33cl', 2.5),
          new Product('Coca Cola Zero', '33cl', 2.5)
        ]),
        new ProductType('Beers', true, [
          new Product('Jupiler', '25cl', 2),
          new Product('Jupiler', '33cl', 2.5)
        ])
      ]),
      new ProductCategory('Snacks', [
        new ProductType('Sandwiches', true, [
          new Product('Smos', 'cheese, ham, vegetables', 3.5),
          new Product('Smos cheese', 'cheese, vegetables', 3.5)
        ]),
        new ProductType('Ice cream', true, [
          new Product('Calippo Cola', '', 1),
          new Product('Calippo Orange', '', 1)
        ])
      ])
    ];
  }

}
