import { Component } from '@angular/core';
import { ShoppingCart } from '../../shared/objects/cart/shopping-cart';
import { ShoppingCartModel } from '../../shared/framework/models/shopping-cart.model';
import { Unsubscribable } from '../../shared/components/unsubscribable';

@Component({
  moduleId: module.id,
  selector: 'ss-current-order',
  templateUrl: 'current-order.component.html',
  styleUrls: ['current-order.component.css']
})
export class CurrentOrderComponent extends Unsubscribable {

  ordered: boolean = false;
  cart: ShoppingCart;

  constructor(private _shoppingCartModel: ShoppingCartModel) {
    super();
    _shoppingCartModel.persistedCart$.takeUntil(this._ngUnsubscribe$)
      .subscribe(cart => {
        this.cart = cart;
      });
    _shoppingCartModel.ordered$.takeUntil(this._ngUnsubscribe$)
      .subscribe(ordered => {
        this.ordered = ordered;
      });
  }
}
