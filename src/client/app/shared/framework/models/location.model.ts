import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Model } from './model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { LocationLoadingComponent } from '../../services/location/components/location-loading.component';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Beach } from '../../objects/beach/beach';
import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';

@Injectable()
export class LocationModel extends Model {

  private static dialogOptions: MdDialogConfig = {
    disableClose: true
  };

  locationPermissionStatus$: Observable<LocationPermissionStatus>;
  lastKnownLocation$: Observable<Position>;
  atBeach$: Observable<Beach>;

  private _permissionStatus: LocationPermissionStatus = null;

  constructor(protected _store: Store<any>, private dialog: MdDialog) {
    super();
    this.locationPermissionStatus$ = this._store.select('locationPermissionStatus');
    this.lastKnownLocation$ = this._store.select('lastKnownLocation');
    this.atBeach$ = this._store.select('atBeach');
    this.locationPermissionStatus$.subscribe(permissionStatus => {
      this._permissionStatus = permissionStatus;
    });
  }

  startFetchingLocation() {
    if (this._permissionStatus !== LocationPermissionStatus.GRANTED) {
      let dialogRef = this.dialog.open(LocationLoadingComponent, LocationModel.dialogOptions);
      navigator.geolocation.watchPosition((location) => {
          this._store.dispatch(SpotSupplyActions.locationPermissionUpdated(LocationPermissionStatus.GRANTED));
          this._store.dispatch(SpotSupplyActions.userPositionUpdated(location));
          dialogRef.close('SUCCESS');
        },
        (error: PositionError) => {
          this._store.dispatch(SpotSupplyActions.locationPermissionUpdated(LocationPermissionStatus.DENIED));
          dialogRef.close('FAILURE');
        }, {
          timeout: 20000,
          enableHighAccuracy: true
        });
    }
  }

  setUserAtBeach(atBeach: Beach) {
    this._store.dispatch(SpotSupplyActions.userAtBeach(atBeach));
  }
}
