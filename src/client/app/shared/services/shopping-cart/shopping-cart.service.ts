import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Product } from '../../objects/product/product';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ShoppingCartService {

  private cart = new Map<number, number>();

  private productTotal: number = 0;
  private productTotalSubject = new Subject<number>();

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

  placeOrder() {
    this.ordered = true;
    this.orderedSubject.next(true);
  }

  productsAmountSubscription(obs: ((value: number) => void)) {
    this.productsAmountSubject.subscribe(obs);
  }

  orderedSubscription(obs: ((value: boolean) => void)) {
    this.orderedSubject.subscribe(obs);
  }

  removeAllProducts() {
    this.cart.clear();
    this._calculateNewTotal();
  }

  private _calculateNewTotal() {
    let totalTmp = 0;
    let prodAmt = 0;
    this.cart.forEach((amount, productId) => {
      totalTmp += this._productMap.get(productId).price * amount;
      prodAmt += amount;
    });
    this.productTotal = totalTmp;
    this.productTotalSubject.next(totalTmp);
    this.productsAmount = prodAmt;
    this.productsAmountSubject.next(prodAmt);
  }
}

