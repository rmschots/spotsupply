import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Product } from '../../objects/product/product';
import * as Collections from 'typescript-collections';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class ShoppingCartService {

  private cart = new Collections.Dictionary<Product, number>();

  private productTotal: number = 0;
  private productTotalSubject = new Subject<number>();

  private ordered: boolean = false;
  private orderedSubject = new Subject<boolean>();

  private productsAmount: number = 0;
  private productsAmountSubject = new Subject<number>();

  getProductTotal(): number {
    return this.productTotal;
  }

  getProductsAmount() {
    return this.productsAmount;
  }

  getCart(): Collections.Dictionary<Product, number> {
    return this.cart;
  }

  getProductAmount(product: Product): number {
    return this.cart.containsKey(product) ? this.cart.getValue(product) : 0;
  }

  isOrdered(): boolean {
    return this.ordered;
  }

  placeOrder() {
    this.ordered = true;
    this.orderedSubject.next(true);
  }

  productTotalSubscription(obs: ((value: number) => void)) {
    this.productTotalSubject.subscribe(obs);
  }

  productsAmountSubscription(obs: ((value: number) => void)) {
    this.productsAmountSubject.subscribe(obs);
  }

  orderedSubscription(obs: ((value: boolean) => void)) {
    this.orderedSubject.subscribe(obs);
  }

  addProduct(product: Product) {
    if (this.cart.containsKey(product)) {
      this.cart.setValue(product, this.cart.getValue(product) + 1);
    } else {
      this.cart.setValue(product, 1);
    }
    this.calculateNewTotal();
  }

  removeProduct(product: Product) {
    if (this.cart.containsKey(product)) {
      let currentAmount = this.cart.getValue(product);
      if (currentAmount <= 1) {
        this.cart.remove(product);
      } else {
        this.cart.setValue(product, currentAmount - 1);
      }
      this.calculateNewTotal();
    }
  }

  removeAllProducts() {
    this.cart.clear();
    this.calculateNewTotal();
  }

  private calculateNewTotal() {
    let totalTmp = 0;
    let prodAmt = 0;
    this.cart.forEach((product, amount) => {
      totalTmp += product.price * amount;
      prodAmt += amount;
    });
    this.productTotal = totalTmp;
    this.productTotalSubject.next(totalTmp);
    this.productsAmount = prodAmt;
    this.productsAmountSubject.next(prodAmt);
  }
}

