import { Component } from '@angular/core';
import { ShoppingCartService } from '../../shared/services/shopping-cart/shopping-cart.service';

@Component({
  moduleId: module.id,
  selector: 'ss-current-order',
  templateUrl: 'current-order.component.html',
  styleUrls: ['current-order.component.css']
})
export class CurrentOrderComponent {

  ordered: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.ordered = shoppingCartService.isOrdered();

    shoppingCartService.orderedSubscription(ordered => {
      this.ordered = ordered;
    });
  }

  getCurrentCart() {
    return this.shoppingCartService.getCart();
  }
}
