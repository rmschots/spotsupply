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

  getProductTotal(): number {
    return this.productTotal;
  }

  getCart(): Collections.Dictionary<Product, number> {
    return this.cart;
  }

  productTotalSubscription(obs: ((value: number) => void)) {
    this.productTotalSubject.subscribe(obs);
  }

  getProductAmount(product: Product): number {
    return this.cart.containsKey(product) ? this.cart.getValue(product) : 0;
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
    this.cart.forEach((product, amount) => {
      totalTmp += product.price * amount;
    });
    this.productTotal = totalTmp;
    this.productTotalSubject.next(totalTmp);
  }
}

