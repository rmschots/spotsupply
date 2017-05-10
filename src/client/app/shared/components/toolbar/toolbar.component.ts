import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Router } from '@angular/router';
import { LocationModel } from '../../framework/models/location.model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';
import { Unsubscribable } from '../unsubscribable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DataStatus } from '../../services/gateway/data-status';

@Component({
  moduleId: module.id,
  selector: 'ss-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent extends Unsubscribable {

  @Output() openMenu = new EventEmitter<boolean>();
  @Input() menuOpen: boolean = false;

  title: string;
  productsAmount = 0;
  showCart = false;
  showOrder = false;
  error: string;

  constructor(private navigationService: NavigationService,
              private router: Router,
              private _locationModel: LocationModel,
              private _shoppingCartModel: ShoppingCartModel) {
    super();
    this.title = this.navigationService.getTitle();

    navigationService.titleSubscription((title: string) => {
      this.title = title;
    });
    _shoppingCartModel.productAmount$.takeUntil(this._ngUnsubscribe$)
      .subscribe(amt => {
        this.productsAmount = amt;
      });
    _locationModel.permission$.takeUntil(this._ngUnsubscribe$)
      .subscribe(permissionStatus => {
        if (permissionStatus === LocationPermissionStatus.DENIED) {
          this.error = 'map.errorCode.' + LocationPermissionStatus.DENIED;
        } else {
          this.error = null;
        }
      });
    combineLatest(_shoppingCartModel.cartAvailable$, _shoppingCartModel.ordered$, _locationModel.atBeach$)
      .takeUntil(this._ngUnsubscribe$)
      .subscribe(latestValues => {
        const [hasCart, ordered, atBeach] = latestValues;
        this.showCart = hasCart === DataStatus.AVAILABLE && !ordered && !!atBeach;
        this.showOrder = hasCart === DataStatus.AVAILABLE && ordered;
      });
  }

  menuOpened() {
    if (!this.menuOpen) {
      this.menuOpen = true;
      this.openMenu.next();
    }
  }

  goToCart() {
    this.router.navigate(['/store']);
  }

  goToOrder() {
    this.router.navigate(['/settings/current-order']);
  }
}

