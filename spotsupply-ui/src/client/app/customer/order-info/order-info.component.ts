import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { MdDialog, MdSnackBar, MdSnackBarRef, SimpleSnackBar } from '@angular/material';
import { ConfirmationInfoComponent } from './confirmation-info/confirmation-info.component';
import { ShoppingCartModel } from '../../shared/framework/models/shopping-cart.model';
import { ShoppingCart } from '../../shared/objects/cart/shopping-cart';
import { Unsubscribable } from '../../shared/components/unsubscribable';
import { BeachModel } from '../../shared/framework/models/beach.model';
import { Observable } from 'rxjs/Observable';
import { LocationModel } from '../../shared/framework/models/location.model';
import { DataStatus } from '../../shared/services/gateway/data-status';
import { DeliveryModel } from '../../shared/framework/models/delivery.model';
import { LoginModel } from '../../shared/framework/models/login.model';

@Component({
  moduleId: module.id,
  selector: 'ss-order-info',
  templateUrl: 'app/customer/order-info/order-info.component.html',
  styleUrls: ['app/customer/order-info/order-info.component.css']
})
export class OrderInfoComponent extends Unsubscribable implements OnDestroy {

  cart: ShoppingCart;

  paymentMethod: string = 'Cash';
  errorMessage: string;

  hasNoPossibleTimes = false;

  private _snackbarRef: MdSnackBarRef<SimpleSnackBar>;

  constructor(private navigationService: NavigationService,
              private _shoppingCartModel: ShoppingCartModel,
              private _beachModel: BeachModel,
              private _locationModel: LocationModel,
              private _deliveryModel: DeliveryModel,
              private _loginModel: LoginModel,
              private router: Router,
              private dialog: MdDialog,
              private _snackBar: MdSnackBar) {
    super();
    navigationService.setTitle('order-info');
    _shoppingCartModel.persistedCart$.takeUntil(this._ngUnsubscribe$)
      .subscribe(cart => {
        if (!!cart) {
          this.cart = cart;
        }
      });
    this.possibleTimes.takeUntil(this._ngUnsubscribe$)
      .subscribe(possibleTimes => {
        if (possibleTimes) {
          this.cart.requestedTime = possibleTimes[0];
        }
      });
    this._refreshPossibleTimes();
  }

  get beachName() {
    return this._shoppingCartModel.persistedCart$
      .switchMap(cart => cart ?
        this._beachModel.getBeachObs(cart.beachId).map(beach => beach.name)
        : Observable.of(''));
  }

  get phoneNumber() {
    return this._loginModel.loginUser$.map(loginUser => {
      if (!loginUser) {
        return '';
      } else {
        return loginUser.phoneNumber;
      }
    });
  }

  get isNotAtBeachYet() {
    return this._locationModel.atBeachAvailable$.map(status => {
      return status !== DataStatus.AVAILABLE;
    });
  }

  get possibleTimes() {
    return this._deliveryModel.possibleTimes$;
  }

  placeOrder() {
    this._shoppingCartModel.placeOrder().take(1)
      .subscribe(complete => {
        if (complete) {
          let dialogRef = this.dialog.open(ConfirmationInfoComponent);
          dialogRef.afterClosed().take(1)
            .subscribe(() => {
              this.router.navigate(['/settings/current-order']);
            });
        }
      }, () => {
        this._refreshPossibleTimes();
      });
  }

  ngOnDestroy(): void {
    if (this._snackbarRef) {
      this._snackbarRef.dismiss();
    }
    super.ngOnDestroy();
  }

  private _refreshPossibleTimes() {
    this._deliveryModel.refreshPossibleTimes().take(1)
      .subscribe(null,
        error => {
          this.hasNoPossibleTimes = true;
          this._snackbarRef = this._snackBar.open(error.message, 'Home');
          this._snackbarRef.onAction().take(1).subscribe(() => {
            this.router.navigate(['/']);
          });
        });
  }
}
