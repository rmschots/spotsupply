import { Component, Input } from '@angular/core';
import { Product } from '../../objects/product/product';
import { ShoppingCart } from '../../objects/cart/shopping-cart';
import { ProductsModel } from '../../framework/models/products.model';
import { Unsubscribable } from '../unsubscribable';

@Component({
  moduleId: module.id,
  selector: 'ss-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css']
})
export class CartComponent extends Unsubscribable {

  @Input() cart: ShoppingCart;
  @Input() showTotal = true;

  private _productsMap: Map<number, Product>;

  constructor(private _productsModel: ProductsModel) {
    super();
    _productsModel.productMap$.takeUntil(this._ngUnsubscribe$)
      .subscribe(productsMap => {
        this._productsMap = productsMap;
      });
  }

  getProducts(): Product[] {
    return Array.from(
      new Set(this.cart.items.map(item => item.productId))
    ).map(productId => this._productsMap.get(productId));
  }

  getProductAmount(product: Product) {
    return this.cart.items
      .filter(item => item.productId === product.id)
      .length;
  }

  getTotalAmount(): number {
    return this.cart.items
      .map(item => this._productsMap.get(item.productId).price)
      .reduce((price1, price2) => {
        return price1 + price2;
      });
  }

  get show(): boolean {
    return !!this._productsMap && this.cart && !!this.cart.items;
  }
}
