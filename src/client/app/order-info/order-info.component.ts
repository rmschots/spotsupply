import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { ShoppingCartService } from '../shared/services/shopping-cart/shopping-cart.service';
import { OrderInfo } from './order-info';
import { Product } from '../shared/objects/product/product';
import * as Collections from 'typescript-collections';

@Component({
  moduleId: module.id,
  selector: 'ss-order-info',
  templateUrl: 'order-info.component.html',
  styleUrls: ['order-info.component.css']
})
export class OrderInfoComponent {

  cart: Collections.Dictionary<Product, number>;
  orderInfo = new OrderInfo('Ostend', '0123 45 67 89', 'Bring now', 'Cash');
  times = ['Bring now', '10:30', '10:45', '11:00'];
  paymentMethods = ['Cash'];

  constructor(private navigationService: NavigationService, private shoppingCartService: ShoppingCartService) {
    navigationService.setTitle('order-info');
    this.cart = shoppingCartService.getCart();
  }
}
