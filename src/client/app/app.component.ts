import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from './shared/config/env.config';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginModel } from './shared/framework/models/login.model';
import { ShoppingCartModel } from './shared/framework/models/shopping-cart.model';
import { BeachModel } from './shared/framework/models/beach.model';
import { ProductsModel } from './shared/framework/models/products.model';
import { Unsubscribable } from './shared/components/unsubscribable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  moduleId: module.id,
  selector: 'ss-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})

export class AppComponent extends Unsubscribable implements OnInit {

  isDesktop: boolean = false;
  menuOpen: boolean = false;
  marginLeft: number = 0;

  @ViewChild(NavbarComponent) navbar: NavbarComponent;

  constructor(private _loginModel: LoginModel,
              private _shoppingCartModel: ShoppingCartModel,
              private _beachModel: BeachModel,
              private _productsModel: ProductsModel) {
    super();
    console.log('Environment config', Config);
    (<any>window).loading_screen.finish();
  }

  menuOpened() {
    this.menuOpen = true;
  }

  sideNavClosed(updateNavbar: boolean) {
    if (updateNavbar) {
      this.navbar.setMenuClosed();
    }
    this.menuOpen = false;
  }

  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i
        .test(navigator.userAgent)) {
      console.log('mobile');
    } else {
      console.log('desktop');
      this.isDesktop = true;
    }
    this._loginModel.loadAccount()
      .takeUntil(this._ngUnsubscribe$)
      .subscribe(loggedIn => {
          console.log('logged in: ' + loggedIn);
        },
        error => {
          console.log(error);
        });
    this._beachModel.loadBeaches();
    this._productsModel.loadProductHierarchy();
    this._shoppingCartModel.loadShoppingCart();
  }
}
