import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { ShoppingCartModel } from '../shared/framework/models/shopping-cart.model';
import { Unsubscribable } from '../shared/components/unsubscribable';
import { LoginModel } from '../shared/framework/models/login.model';

@Component({
  moduleId: module.id,
  selector: 'ss-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.css']
})
export class StoreComponent extends Unsubscribable {

  productTotal: number;

  private _loggedIn: boolean = false;

  constructor(private navigationService: NavigationService,
              private router: Router,
              private _loginModel: LoginModel,
              private _shoppingCartModel: ShoppingCartModel) {
    super();
    navigationService.setTitle('store');
    _shoppingCartModel.productTotal$.takeUntil(this._ngUnsubscribe$)
      .subscribe(total => {
        this.productTotal = total;
      });
    _loginModel.loggedIn$.takeUntil(this._ngUnsubscribe$)
      .subscribe(loggedIn => {
        this._loggedIn = loggedIn;
      });
  }

  onClearCartClicked() {
    if (this.productTotal > 0) {
      this._shoppingCartModel.removeAllProducts();
    }
  }

  onNextClicked() {
    if (this.productTotal > 0) {
      if (this._loggedIn) {
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
