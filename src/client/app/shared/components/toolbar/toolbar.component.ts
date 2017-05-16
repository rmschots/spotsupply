import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Router } from '@angular/router';
import { LocationModel } from '../../framework/models/location.model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { ShoppingCartModel } from '../../framework/models/shopping-cart.model';
import { Unsubscribable } from '../unsubscribable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { DataStatus } from '../../services/gateway/data-status';
import { MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';

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

  private _snackbarRef: MdSnackBarRef<SimpleSnackBar>;

  constructor(private navigationService: NavigationService,
              private router: Router,
              private _locationModel: LocationModel,
              private _shoppingCartModel: ShoppingCartModel,
              private _snackBar: MdSnackBar) {
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
    combineLatest(_shoppingCartModel.cartAvailable$, _shoppingCartModel.ordered$, _locationModel.atBeachAvailable$)
      .takeUntil(this._ngUnsubscribe$)
      .subscribe(latestValues => {
        const [hasCart, ordered, atBeach] = latestValues;
        this.showCart = hasCart === DataStatus.AVAILABLE && !ordered && atBeach === DataStatus.AVAILABLE;
        this.showOrder = hasCart === DataStatus.AVAILABLE && ordered;
      });
    this.isNotAtBeach
      .takeUntil(this._ngUnsubscribe$)
      .subscribe(notAvailable => {
        if (this._snackbarRef && !notAvailable) {
          this._snackbarRef.dismiss();
        }
      });
  }

  get isNotAtBeach() {
    return this._locationModel.atBeachAvailable$.map(status => {
      return status === DataStatus.UNAVAILABLE;
    });
  }

  isChecking(): boolean {
    return this._locationModel.isWatchingPosition();
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

  clickNotAtBeach() {
    this._snackbarRef = this._snackBar.open('Not at beach!', 'Home');
    this._snackbarRef.onAction().take(1).subscribe(() => {
      this.router.navigate(['/']);
    });
    this._snackbarRef.afterDismissed().take(1)
      .subscribe(() => {
        this._snackbarRef = null;
      });
  }
}

