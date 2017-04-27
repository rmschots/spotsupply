import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Product } from '../../objects/product/product';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ShoppingCartService {

  private cart = new Map<number, number>();

  private ordered: boolean = false;
  private orderedSubject = new Subject<boolean>();

  private productsAmount: number = 0;
  private productsAmountSubject = new Subject<number>();

  private _productMap: Map<number, Product> = new Map();

  getProductsAmount() {
    return this.productsAmount;
  }

  getCart(): Map<Product, number> {
    let productCart = new Map<Product, number>();
    this.cart.forEach((amount, productId) => {
      productCart.set(this._productMap.get(productId), amount);
    });
    return productCart;
  }

  isOrdered(): boolean {
    return this.ordered;
  }

  productsAmountSubscription(obs: ((value: number) => void)) {
    this.productsAmountSubject.subscribe(obs);
  }

  orderedSubscription(obs: ((value: boolean) => void)) {
    this.orderedSubject.subscribe(obs);
  }
}

