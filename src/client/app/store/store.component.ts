import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { ProductCategory } from '../shared/objects/product/product-category';
import { ShoppingCartService } from '../shared/services/shopping-cart/shopping-cart.service';

@Component({
  moduleId: module.id,
  selector: 'ss-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.css']
})
export class StoreComponent {

  categories: ProductCategory[] = [];
  productTotal: number;

  constructor(private navigationService: NavigationService, private shoppingCartService: ShoppingCartService) {
    navigationService.setTitle('store');
    this.productTotal = shoppingCartService.getProductTotal();
    shoppingCartService.productTotalSubscription(total => {
      this.productTotal = total;
    });
  }

  onClearCartClicked() {
    if (this.productTotal > 0) {
      this.shoppingCartService.removeAllProducts();
    }
  }

  onNextClicked() {
    if (this.productTotal > 0) {
      console.log('next clicked');
    }
  }
}
