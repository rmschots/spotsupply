import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { ShoppingCart } from '../../objects/cart/shopping-cart';
import { Product } from '../../objects/product/product';
import { CartItem } from '../../objects/cart/cart-item';
import { URLSearchParams } from '@angular/http';
import { ProductsModel } from './products.model';

@Injectable()
export class ShoppingCartModel extends Model {
  shoppingCart$: Observable<ShoppingCart>;
  persistedCart$: Observable<ShoppingCart>;
  productTotal$: Observable<number>;
  ordered$: Observable<boolean>;
  productAmount$: Observable<number>;

  private _shoppingCart: ShoppingCart = null;
  private _persistedCart: ShoppingCart = null;

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService,
              private _productModel: ProductsModel) {
    super();
    let cart$ = this._store.select('cart');
    this.shoppingCart$ = cart$.map((current: any) => {
      return current.get('live');
    });
    this.persistedCart$ = cart$.map((current: any) => {
      return current.get('persisted');
    });
    this.ordered$ = cart$.map((current: any) => {
      return current.get('ordered');
    });

    this.shoppingCart$.subscribe(cart => {
      this._shoppingCart = cart;
    });
    this.persistedCart$.subscribe(cart => {
      this._persistedCart = cart;
    });

    this.productTotal$ = this.shoppingCart$.combineLatest(
      _productModel.productMap$,
      (cart: ShoppingCart, productMap: Map<number, Product>) => {
        if (!cart || cart.items.length === 0 || !productMap) {
          return 0;
        }
        return cart.items.map(item => {
          return productMap.get(item.productId).price;
        }).reduce((itemPrice1, itemPrice2) => itemPrice1 + itemPrice2);
      });

    // this.ordered$ = this.persistedCart$.map(
    //   (cart: ShoppingCart) => {
    //     return cart && cart.status === 'ORDERED';
    //   });

    this.productAmount$ = this.shoppingCart$.map(
      (cart: ShoppingCart) => {
        if (!cart) {
          return 0;
        }
        return cart.items.length;
      });
  }

  createShoppingCart(beachId: number) {
    if (!this._shoppingCart) {
      let shoppingCart: ShoppingCart = new ShoppingCart(undefined, beachId);
      this._store.dispatch(SpotSupplyActions.loadShoppingCart(shoppingCart));
      this._restGateway.post('/shoppingCart', {beachId: beachId}).subscribe(data => {
        this._store.dispatch(SpotSupplyActions.loadPersistedCart(this.convertRestResponse(data)));
      });
    }
  }

  addProduct(product: Product) {
    let cartItem: CartItem = new CartItem(-1, null, product.id);
    this._shoppingCart.items.push(cartItem);
    this._store.dispatch(SpotSupplyActions.addItemToShoppingCart(this._shoppingCart));
    let params: URLSearchParams = new URLSearchParams();
    params.set('productId', '' + product.id);
    this._restGateway.post('/shoppingCart/addProduct', null, params).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.addItemToPersistedCart(this.convertRestResponse(data)));
    });
  }

  removeProduct(product: Product) {
    this._shoppingCart.items.splice(this._shoppingCart.items.findIndex((item: CartItem) => item.productId === product.id), 1);
    this._store.dispatch(SpotSupplyActions.removeItemFromShoppingCart(this._shoppingCart));
    let params: URLSearchParams = new URLSearchParams();
    params.set('productId', '' + product.id);
    this._restGateway.post('/shoppingCart/removeProduct', null, params).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.removeItemFromPersistedCart(this.convertRestResponse(data)));
    });
  }

  removeAllProducts() {
    this._shoppingCart.items.length = 0;
    this._store.dispatch(SpotSupplyActions.removeAllItemsFromShoppingCart(this._shoppingCart));
    this._restGateway.post('/shoppingCart/removeAllProducts').subscribe(data => {
      this._store.dispatch(SpotSupplyActions.removeAllItemsFromPersistedCart(this.convertRestResponse(data)));
    });
  }

  placeOrder(): Observable<boolean> {
    return this._restGateway.post('/shoppingCart/placeOrder', this._persistedCart).map(data => {
      const cart: ShoppingCart = this.convertRestResponse(data);
      this._store.dispatch(SpotSupplyActions.placeOrder(cart));
      return cart.status === 'ORDERED';
    });
  }

  completeOrder() {
    return this._restGateway.post('/shoppingCart/completeOrder').subscribe(() => {
      this._store.dispatch(SpotSupplyActions.completeOrder());
    });
  }

  loadShoppingCart() {
    this._restGateway.get('/shoppingCart').subscribe(data => {
      this._store.dispatch(SpotSupplyActions.loadPersistedCart(this.convertRestResponse(data)));
      this._store.dispatch(SpotSupplyActions.loadShoppingCart(this.convertRestResponse(data)));
    });
  }

  getProductAmount(product: Product): number {
    return this._shoppingCart
      ? this._shoppingCart.items
        .filter(value => value.productId === product.id)
        .length
      : 0;
  }
}
