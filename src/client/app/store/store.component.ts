import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { ProductCategory } from '../shared/objects/product/product-category';
import { ShoppingCartService } from '../shared/services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CheckoutAsComponent } from './checkout-as/checkout-as.component';

@Component({
  moduleId: module.id,
  selector: 'ss-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.css']
})
export class StoreComponent {

  categories: ProductCategory[] = [];
  productTotal: number;

  constructor(private navigationService: NavigationService, private shoppingCartService: ShoppingCartService,
              private router: Router, public dialog: MdDialog) {
    navigationService.setTitle('store');
    this.productTotal = shoppingCartService.getProductTotal();
    shoppingCartService.productTotalSubscription(total => {
      this.productTotal = total;
    });
  }

  onClearCartClicked() {
    if (this.productTotal > 0) {
      this.shoppingCartService.removeAllProducts();
    }
  }

  onNextClicked() {
    if (this.productTotal > 0) {
      this.openCheckoutAsDialog();
    }
  }

  openCheckoutAsDialog() {
    let dialogRef = this.dialog.open(CheckoutAsComponent);
    dialogRef.afterClosed().subscribe(result => {
      switch(result) {
        case 'no-account':
        case 'login':
        case 'create-account':
          // todo: create other dialog
          this.router.navigate(['/order-info']);
          break;
        case undefined:
          break;
      }
    });
  }
}
