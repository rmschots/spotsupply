import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';
import { DataStatus } from '../gateway/data-status';

@Injectable()
export class HasCartGuard implements CanActivate {

  constructor(private _shoppingCartModel: ShoppingCartModel,
              private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._shoppingCartModel.cartAvailable$.filter(status => {
      return [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(status);
    }).map(status => {
      const canActivate = status === DataStatus.AVAILABLE;
      if (!canActivate) {
        this._router.navigate(['']);
      }
      return canActivate;
    });
  }
}
