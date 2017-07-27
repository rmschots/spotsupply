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
import { LocationModel } from './location.model';
import { DataStatus } from '../../services/gateway/data-status';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ShoppingCartModel extends Model {
  shoppingCart$: Observable<ShoppingCart>;
  persistedCart$: Observable<ShoppingCart>;
  history$: Observable<Array<ShoppingCart>>;
  productTotal$: Observable<number>;
  ordered$: Observable<boolean>;
  productAmount$: Observable<number>;
  cartAvailable$: BehaviorSubject<DataStatus> = new BehaviorSubject(DataStatus.UNKNOWN);

  private _shoppingCart: ShoppingCart = null;
  private _persistedCart: ShoppingCart = null;
  private _cartAvailable: DataStatus = DataStatus.UNKNOWN;

  constructor(private _store: Store<any>,
              private _restGateway: RestGatewayService,
              private _productModel: ProductsModel,
              private _locationModel: LocationModel) {
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
    this.history$ = cart$.map((current: any) => {
      return current.get('history');
    });

    this.shoppingCart$.subscribe(cart => {
      this._shoppingCart = cart;
    });
    this.persistedCart$.subscribe(cart => {
      this._persistedCart = cart;
      if (!!cart) {
        this._setCartAvailable(DataStatus.AVAILABLE);
      }
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

    this.productAmount$ = this.shoppingCart$.map(
      (cart: ShoppingCart) => {
        if (!cart) {
          return 0;
        }
        return cart.items.length;
      });
  }

  createShoppingCart(beachId: number) {
    if ([DataStatus.UNAVAILABLE, DataStatus.UNKNOWN].includes(this._cartAvailable)) {
      this._setCartAvailable(DataStatus.LOADING);
      let shoppingCart: ShoppingCart = new ShoppingCart(undefined, beachId);
      this._store.dispatch(SpotSupplyActions.loadShoppingCart(shoppingCart));
      this._restGateway.post('/shoppingCart', { beachId: beachId }).take(1)
        .subscribe(
          data => {
            this._store.dispatch(SpotSupplyActions.loadPersistedCart(this.initCartData(this.convertRestResponse(data))));
            return true;
          },
          error => {
            this._setCartAvailable(DataStatus.UNAVAILABLE);
            return error;
          });
    } else {
      console.error('trying to create a shopping cart while status is: ' + this._cartAvailable);
    }
  }

  addProduct(product: Product) {
    let cartItem: CartItem = new CartItem(-1, null, product.id);
    this._shoppingCart.items.push(cartItem);
    this._store.dispatch(SpotSupplyActions.addItemToShoppingCart(this._shoppingCart));
    let params: URLSearchParams = new URLSearchParams();
    params.set('productId', '' + product.id);
    this._restGateway.post('/shoppingCart/addProduct', null, params).take(1).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.addItemToPersistedCart(this.initCartData(this.convertRestResponse(data))));
    });
  }

  removeProduct(product: Product) {
    this._shoppingCart.items.splice(this._shoppingCart.items.findIndex((item: CartItem) => item.productId === product.id), 1);
    this._store.dispatch(SpotSupplyActions.removeItemFromShoppingCart(this._shoppingCart));
    let params: URLSearchParams = new URLSearchParams();
    params.set('productId', '' + product.id);
    this._restGateway.post('/shoppingCart/removeProduct', null, params).take(1).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.removeItemFromPersistedCart(this.initCartData(this.convertRestResponse(data))));
    });
  }

  removeAllProducts() {
    this._shoppingCart.items.length = 0;
    this._store.dispatch(SpotSupplyActions.removeAllItemsFromShoppingCart(this._shoppingCart));
    this._restGateway.post('/shoppingCart/removeAllProducts').take(1).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.removeAllItemsFromPersistedCart(this.initCartData(this.convertRestResponse(data))));
    });
  }

  placeOrder(): Observable<boolean> {
    return this._restGateway.post('/shoppingCart/placeOrder', this._persistedCart).map(data => {
      const cart: ShoppingCart = this.initCartData(this.convertRestResponse(data));
      this._store.dispatch(SpotSupplyActions.placeOrder(cart));
      return cart.status === 'ORDERED';
    }).take(1);
  }

  completeOrder() {
    return this._restGateway.post('/shoppingCart/completeOrder').take(1).subscribe(() => {
      this._store.dispatch(SpotSupplyActions.completeOrder());
      this._setCartAvailable(DataStatus.UNAVAILABLE);
    });
  }

  loadShoppingCart() {
    if ([DataStatus.UNAVAILABLE, DataStatus.UNKNOWN].includes(this._cartAvailable)) {
      this._setCartAvailable(DataStatus.LOADING);
      this._restGateway.get('/shoppingCart').take(1).subscribe(
        data => {
          this._store.dispatch(SpotSupplyActions.loadPersistedCart(this.initCartData(this.convertRestResponse(data))));
          this._store.dispatch(SpotSupplyActions.loadShoppingCart(this.initCartData(this.convertRestResponse(data))));
          this._locationModel.startFetchingLocation();
        },
        () => {
          this._setCartAvailable(DataStatus.UNAVAILABLE);
        });
    } else {
      console.error('Tried loading cart while one while status is: ' + this._cartAvailable);
    }
  }

  loadCartHistory() {
    this._restGateway.get('/shoppingCart/history').take(1).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.loadCartHistory(
        this.convertRestResponse(data)
          .map((cart: ShoppingCart) => this.initCartData(cart))
      ));
    });
  }

  getProductAmount(product: Product): number {
    return this._shoppingCart
      ? this._shoppingCart.items
        .filter(value => value.productId === product.id)
        .length
      : 0;
  }

  initCartData(cart: ShoppingCart): ShoppingCart {
    cart.deliveredDateTime = new Date(cart.deliveredDateTime);
    cart.orderDateTime = new Date(cart.orderDateTime);
    return cart;
  }

  private _setCartAvailable(dataStatus: DataStatus) {
    this._cartAvailable = dataStatus;
    this.cartAvailable$.next(this._cartAvailable);
  }
}
