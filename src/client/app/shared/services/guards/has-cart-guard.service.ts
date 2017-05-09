import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';

@Injectable()
export class HasCartGuard implements CanActivate {

  constructor(private _shoppingCartModel: ShoppingCartModel,
              private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._shoppingCartModel.loadShoppingCart();
    return this._shoppingCartModel.hasCart$.filter((hasCart: boolean) => {
      return hasCart !== undefined;
    }).map((success: boolean) => {
      if (!success) {
        this._router.navigate(['']);
      }
      return success;
    });
  }
}
