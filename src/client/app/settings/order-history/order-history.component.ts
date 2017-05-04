import { Component, OnInit } from '@angular/core';
import { ShoppingCartModel } from '../../shared/framework/models/shopping-cart.model';
import { BeachModel } from '../../shared/framework/models/beach.model';

@Component({
  moduleId: module.id,
  selector: 'ss-order-history',
  templateUrl: 'order-history.component.html',
  styleUrls: ['order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  selectedOrderId: number;

  constructor(private _shoppingCartModel: ShoppingCartModel,
              private _beachModel: BeachModel) {
  }

  ngOnInit() {
    this._shoppingCartModel.loadCartHistory();
  }

  toggleCart(cartId: number) {
    if (this.selectedOrderId === cartId) {
      this.selectedOrderId = undefined;
    } else {
      this.selectedOrderId = cartId;
    }
  }

  getBeachName(id: number) {
    return this._beachModel.getBeachName(id);
  }

  get history() {
    return this._shoppingCartModel.history$;
  }
}
