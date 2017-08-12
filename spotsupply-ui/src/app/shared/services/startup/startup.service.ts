import { Injectable } from '@angular/core';
import { LoginModel } from '../../framework/models/login.model';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';
import { BeachModel } from '../../framework/models/beach.model';
import { ProductsModel } from '../../framework/models/products.model';
import { DataStatus } from '../gateway/data-status';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocationModel } from '../../framework/models/location.model';

@Injectable()
export class StartupService {

  initialized$ = new BehaviorSubject<boolean>(false);

  private _initialized = false;

  constructor(private _loginModel: LoginModel,
              private _shoppingCartModel: ShoppingCartModel,
              private _beachModel: BeachModel,
              private _productsModel: ProductsModel,
              private _locationModel: LocationModel) {
  }

  load() {
    if (this._initialized === false) {
      this._initialized = undefined;
      this._loginModel.loginAvailable$
        .filter(loginAvailable => [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(loginAvailable))
        .take(1)
        .subscribe(
          () => {
            this._shoppingCartModel.loadShoppingCart();
          }
        );

      this._loginModel.loadAccount();
      this._beachModel.loadBeaches();
      this._productsModel.loadProducts();

      const obs1$ = this._shoppingCartModel.cartAvailable$;
      const obs2$ = this._beachModel.beachesAvailable$;
      const obs3$ = this._productsModel.productsAvailable$;

      obs1$.filter(cartAvailable => [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(cartAvailable))
        .take(1)
        .subscribe(cartAvailable => {
          if (cartAvailable === DataStatus.AVAILABLE) {
            this._locationModel.startFetchingLocation();
          }
        });

      combineLatest(obs1$, obs2$, obs3$)
        .subscribe((latestValues: any) => {
          const [cartAvailable, beachesAvailable, productsAvailable] = latestValues;
          if ([DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(cartAvailable)
            && [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(beachesAvailable)
            && [DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(productsAvailable)) {
            this._initialized = true;
            this.initialized$.next(this._initialized);
          }
        });
    }
  }
}

