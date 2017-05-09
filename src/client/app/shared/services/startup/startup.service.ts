import { Injectable } from '@angular/core';
import { LoginModel } from '../../framework/models/login.model';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';
import { BeachModel } from '../../framework/models/beach.model';
import { ProductsModel } from '../../framework/models/products.model';
import { DataStatus } from '../gateway/data-status';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StartupService {

  initialized$ = new BehaviorSubject<boolean>(false);

  private _initialized: boolean = false;

  constructor(private _loginModel: LoginModel,
              private _shoppingCartModel: ShoppingCartModel,
              private _beachModel: BeachModel,
              private _productsModel: ProductsModel) {

  }

  load() {
    if (this._initialized === false) {
      this._initialized = undefined;
      this._loginModel.loginAvailable$.subscribe(
        (loginAvailable) => {
          if ([DataStatus.AVAILABLE, DataStatus.UNAVAILABLE].includes(loginAvailable)) {
            this._shoppingCartModel.loadShoppingCart();
          }
        }
      );

      this._loginModel.loadAccount();
      this._beachModel.loadBeaches();
      this._productsModel.loadProductHierarchy();

      let obs1$ = this._shoppingCartModel.hasCart$;
      let obs2$ = this._beachModel.beaches$;
      let obs3$ = this._productsModel.productHierarchy$;

      combineLatest(obs1$, obs2$, obs3$)
        .subscribe((latestValues: any) => {
          const [hasCart, beaches, productHierarchy] = latestValues;
          if (hasCart && beaches && productHierarchy) {
            this._initialized = true;
            this.initialized$.next(this._initialized);
          }
        });

    }
  }

}

