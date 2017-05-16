import { Component } from '@angular/core';
import { NavigationService } from '../shared/services/navigation/navigation.service';
import { OrderInfo } from './order-info';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ConfirmationInfoComponent } from './confirmation-info/confirmation-info.component';
import { ShoppingCartModel } from '../shared/framework/models/shopping-cart.model';
import { ShoppingCart } from '../shared/objects/cart/shopping-cart';
import { Unsubscribable } from '../shared/components/unsubscribable';
import { BeachModel } from '../shared/framework/models/beach.model';
import { Observable } from 'rxjs/Observable';
import { LocationModel } from '../shared/framework/models/location.model';
import { DataStatus } from '../shared/services/gateway/data-status';

@Component({
  moduleId: module.id,
  selector: 'ss-order-info',
  templateUrl: 'order-info.component.html',
  styleUrls: ['order-info.component.css']
})
export class OrderInfoComponent extends Unsubscribable {

  cart: ShoppingCart;

  orderInfo = new OrderInfo('Ostend', '0123 45 67 89', 'Bring now', 'Cash');
  times = ['Bring now', '10:30', '10:45', '11:00'];
  paymentMethods = ['Cash'];

  constructor(private navigationService: NavigationService,
              private _shoppingCartModel: ShoppingCartModel,
              private _beachModel: BeachModel,
              private _locationModel: LocationModel,
              private router: Router,
              private dialog: MdDialog) {
    super();
    navigationService.setTitle('order-info');
    _shoppingCartModel.persistedCart$.takeUntil(this._ngUnsubscribe$)
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  get beachName() {
    return this._shoppingCartModel.persistedCart$
      .switchMap(cart => cart ?
        this._beachModel.getBeachObs(cart.beachId).map(beach => beach.name)
        : Observable.of(''));
  }

  get isNotAtBeachYet() {
    return this._locationModel.atBeachAvailable$.map(status => {
      return status !== DataStatus.AVAILABLE;
    });
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
      }, (error: any) => {
        console.log('test');
      });
  }
}
