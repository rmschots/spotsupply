import { Component, Input } from '@angular/core';
import { Product } from '../../objects/product/product';

@Component({
  moduleId: module.id,
  selector: 'ss-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css']
})
export class CartComponent {

  @Input() cart: Map<Product, number>;

  getProducts(): Product[] {
    return Array.from(this.cart.keys());
  }

  getProductAmount(product: Product) {
    return this.cart.get(product);
  }

  getTotalAmount(): number {
    let totalTmp = 0;
    this.cart.forEach((amount, product) => {
      totalTmp += product.price * amount;
    });
    return totalTmp;
  }
}
