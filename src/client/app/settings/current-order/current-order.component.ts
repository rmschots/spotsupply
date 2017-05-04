import { Component, OnInit } from '@angular/core';
import { ShoppingCartModel } from '../../shared/framework/models/shopping-cart.model';

@Component({
  moduleId: module.id,
  selector: 'ss-current-order',
  templateUrl: 'current-order.component.html',
  styleUrls: ['current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {
  constructor(private _shoppingCartModel: ShoppingCartModel) {
  }

  ngOnInit(): void {
    this._shoppingCartModel.loadShoppingCart();
  }

  completeOrder() {
    this._shoppingCartModel.completeOrder();
  }

  get cart() {
    return this._shoppingCartModel.shoppingCart$;
  }

  get ordered() {
    return this._shoppingCartModel.ordered$;
  }
}
