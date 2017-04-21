import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { ShoppingCartService } from '../shared/services/shopping-cart/shopping-cart.service';
import { OrderInfo } from './order-info';
import { Product } from '../shared/objects/product/product';
import * as Collections from 'typescript-collections';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ConfirmationInfoComponent } from './confirmation-info/confirmation-info.component';

@Component({
  moduleId: module.id,
  selector: 'ss-order-info',
  templateUrl: 'order-info.component.html',
  styleUrls: ['order-info.component.css']
})
export class OrderInfoComponent {

  cart: Map<Product, number>;
  orderInfo = new OrderInfo('Ostend', '0123 45 67 89', 'Bring now', 'Cash');
  times = ['Bring now', '10:30', '10:45', '11:00'];
  paymentMethods = ['Cash'];

  constructor(private navigationService: NavigationService,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              private dialog: MdDialog) {
    navigationService.setTitle('order-info');
    this.cart = shoppingCartService.getCart();
  }

  placeOrder() {
    this.shoppingCartService.placeOrder();
    let dialogRef = this.dialog.open(ConfirmationInfoComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/settings/current-order']);
    });
  }
}
