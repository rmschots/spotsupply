import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Product } from '../../objects/product/product';
import { ProductsModel } from '../../framework/models/products.model';
import { ProductCategory } from '../../objects/product/product-category';

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

  private _categories: ProductCategory[] = [];
  private _productMap: Map<number, Product> = new Map();

  constructor(private _productsModel: ProductsModel) {
    _productsModel.productHierarchy$.subscribe(categories => {
      this._categories = categories;
      this._productMap = this._generateProductMap(this._categories);
    });
  }

  getProductTotal(): number {
    return this.productTotal;
  }

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

  getProductAmount(product: Product): number {
    return this.cart.has(product.id) ? this.cart.get(product.id) : 0;
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
    if (this.cart.has(product.id)) {
      this.cart.set(product.id, this.cart.get(product.id) + 1);
    } else {
      this.cart.set(product.id, 1);
    }
    this._calculateNewTotal();
  }

  removeProduct(product: Product) {
    if (this.cart.has(product.id)) {
      let currentAmount = this.cart.get(product.id);
      if (currentAmount <= 1) {
        this.cart.delete(product.id);
      } else {
        this.cart.set(product.id, currentAmount - 1);
      }
      this._calculateNewTotal();
    }
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

  private _generateProductMap(categories: ProductCategory[]): Map<number, Product> {
    let tmp: [number, Product][] = categories
      .map((category) => {
        return category.types;
      })
      .reduce(((types1, types2) => types1.concat(types2)), [])
      .map((type) => {
        return type.products;
      })
      .reduce(((product1, product2) => product1.concat(product2)), [])
      .map((i) => <[number, Product]>[i.id, i]);
    return new Map<number, Product>(tmp);
  }
}

