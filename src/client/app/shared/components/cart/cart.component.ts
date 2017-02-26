import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../objects/product/product';
import * as Collections from 'typescript-collections';

@Component({
  moduleId: module.id,
  selector: 'ss-cart',
  templateUrl: 'cart.component.html',
  styleUrls: ['cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() cart: Collections.Dictionary<Product, number>;

  ngOnInit(): void {
    if (!this.cart || this.cart.isEmpty()) {
      this.cart = new Collections.Dictionary<Product, number>();
      this.cart.setValue(new Product(1, 'Dummy Coca Cola', '33cl', 2.5), 2);
      this.cart.setValue(new Product(6, 'Dummy Smos cheese', 'cheese, vegetables', 3.5), 1);
      this.cart.setValue(new Product(3, 'Dummy Jupiler', '25cl', 2), 1);
      this.cart.setValue(new Product(4, 'Dummy Jupiler', '33cl', 2.5), 1);
    }
  }

  getProducts(): Product[] {
    return this.cart.keys();
  }

  getProductAmount(product: Product) {
    return this.cart.getValue(product);
  }

  getTotalAmount(): number {
    let totalTmp = 0;
    this.cart.forEach((product, amount) => {
      totalTmp += product.price * amount;
    });
    return totalTmp;
  }
}
