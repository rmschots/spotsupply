import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user/user.service';
import { ShoppingCartModel } from '../shared/framework/models/shopping-cart.model';

@Component({
  moduleId: module.id,
  selector: 'ss-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.css']
})
export class StoreComponent {

  productTotal: number;

  constructor(private navigationService: NavigationService,
              private router: Router,
              private userService: UserService,
              private _shoppingCartModel: ShoppingCartModel) {
    navigationService.setTitle('store');
    _shoppingCartModel.productTotal$.subscribe(total => {
      this.productTotal = total;
    });
  }

  onClearCartClicked() {
    if (this.productTotal > 0) {
      this._shoppingCartModel.removeAllProducts();
    }
  }

  onNextClicked() {
    if (this.productTotal > 0) {
      if (this.userService.isLoggedIn()) {
        this.router.navigate(['/order-info']);
      } else {
        this.openCheckoutAsDialog();
      }
    }
  }

  openCheckoutAsDialog() {
    this.router.navigate(['/order-info']);
  }
}
