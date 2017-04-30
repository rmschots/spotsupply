import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { Model } from './model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { LocationLoadingComponent } from '../../services/location/components/location-loading.component';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Beach } from '../../objects/beach/beach';
import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';

@Injectable()
export class LocationModel extends Model {

  private static dialogOptions: MdDialogConfig = {
    disableClose: true
  };

  permission$: Observable<LocationPermissionStatus>;
  lastKnownLocation$: Observable<Position>;
  atBeach$: Observable<Beach>;

  private _permissionStatus: LocationPermissionStatus = null;
  private _dialogRef: MdDialogRef<LocationLoadingComponent>;
  private _watchId: number;

  constructor(protected _store: Store<any>, private dialog: MdDialog) {
    super();
    let location$: Observable<any> = this._store.select('location');
    this.permission$ = location$.scan((accum: boolean, current: any) => {
      return (current && current.get('permission')) || accum;
    }, false);
    this.lastKnownLocation$ = location$.scan((accum: boolean, current: any) => {
      return (current && current.get('position')) || accum;
    }, false);
    this.atBeach$ = location$.scan((accum: boolean, current: any) => {
      return (current && current.get('atBeach')) || accum;
    }, false);
    this.permission$.subscribe(permissionStatus => {
      this._permissionStatus = permissionStatus;
    });
  }

  startFetchingLocation() {
    if (!this._watchId) {
      this._watchPosition(true);
    } else {
      console.error('already watching location');
    }
  }

  isWatchingPosition(): boolean {
    return !!this._watchId;
  }

  setUserAtBeach(atBeach: Beach) {
    this._store.dispatch(SpotSupplyActions.userAtBeach(atBeach));
  }

  private _watchPosition(useDialog: boolean) {
    if (useDialog) {
      this._dialogRef = this.dialog.open(LocationLoadingComponent, LocationModel.dialogOptions);
    }
    this._watchId = navigator.geolocation.watchPosition((location) => {
        console.error('success location');
        this._store.dispatch(SpotSupplyActions.locationPermissionUpdated(LocationPermissionStatus.GRANTED));
        this._store.dispatch(SpotSupplyActions.userPositionUpdated(location));
        if (useDialog) {
          this._dialogRef.close('SUCCESS');
        }
      },
      (error: PositionError) => {
        console.error('error location');
        if (this._watchId) {
          navigator.geolocation.clearWatch(this._watchId);
          this._watchId = null;
        }
        if (useDialog) {
          this._dialogRef.close('FAILURE');
        }
        this._store.dispatch(SpotSupplyActions.locationPermissionUpdated(LocationPermissionStatus.DENIED));
      }, {
        timeout: 20000,
        enableHighAccuracy: true
      });
  }
}
