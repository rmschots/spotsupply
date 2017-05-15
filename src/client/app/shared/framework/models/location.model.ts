import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Model } from './model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { LocationLoadingComponent } from '../../components/location-loading/location-loading.component';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Beach } from '../../objects/beach/beach';
import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { BeachModel } from './beach.model';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { Coordinate } from '../../objects/position/position';
import { DataStatus } from '../../services/gateway/data-status';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocationModel extends Model {

  private static dialogOptions: MdDialogConfig = {
    disableClose: true
  };

  permission$: Observable<LocationPermissionStatus>;
  lastKnownLocation$: Observable<Position>;
  atBeach$: Observable<Beach>;
  beachDistance$: Observable<Map<number, number>>;
  distanceToBeachAvailable$: BehaviorSubject<DataStatus> = new BehaviorSubject(DataStatus.UNKNOWN);
  atBeachAvailable$: BehaviorSubject<DataStatus> = new BehaviorSubject(DataStatus.UNKNOWN);

  private _permissionStatus: LocationPermissionStatus = null;
  private _dialogRef: MdDialogRef<LocationLoadingComponent>;
  private _watchId: number;
  private _beachDistanceMap: Map<number, number> = new Map();
  private _atBeach: Beach;
  private _distanceToBeachAvailable: DataStatus = DataStatus.UNKNOWN;
  private _atBeachAvailable: DataStatus = DataStatus.UNKNOWN;

  constructor(protected _store: Store<any>,
              private dialog: MdDialog,
              private _beachModel: BeachModel,
              private _restGateway: RestGatewayService) {
    super();
    let location$: Observable<any> = this._store.select('location');
    this.permission$ = location$.scan((accum: boolean, current: any) => {
      return (current && current.get('permission')) || accum;
    }, false);
    this.lastKnownLocation$ = location$.scan((accum: boolean, current: any) => {
      return (current && current.get('position')) || accum;
    }, false);
    this.beachDistance$ = location$.scan((accum: boolean, current: any) => {
      return (current && current.get('beachDistances')) || accum;
    }, false);
    this.permission$.subscribe(permissionStatus => {
      this._permissionStatus = permissionStatus;
    });
    this.beachDistance$.subscribe(beachDistances => {
      if (beachDistances) {
        this._beachDistanceMap = beachDistances;
        this._setDistanceToBeachAvailable(DataStatus.AVAILABLE);
      }
    });
    this.lastKnownLocation$
      .distinctUntilChanged((pos1: Position, pos2: Position) => {
        if (!pos1 && !pos2) { // both empty
          return true;
        }
        if((!pos1 || !pos2) && (!!pos1 || !!pos2)) { // only 1 empty
          return false;
        }
        return pos1.coords.latitude === pos2.coords.latitude && pos1.coords.longitude === pos2.coords.longitude;
      })
      .subscribe(position => {
        if (position) {
          let coordinate = new Coordinate();
          coordinate.lng = position.coords.longitude;
          coordinate.lat = position.coords.latitude;
          this._restGateway.post('/geo/distances', coordinate).take(1)
            .subscribe(
              data => {
                this._store.dispatch(SpotSupplyActions.updateBeachDistances(this.convertRestResponse(data)));
                return true;
              },
              error => {
                this._setDistanceToBeachAvailable(DataStatus.UNAVAILABLE);
                return error;
              });
        } else if (this._distanceToBeachAvailable === DataStatus.AVAILABLE) {
          this._setDistanceToBeachAvailable(DataStatus.UNAVAILABLE);
        }
      });
    this.atBeach$ = this.distanceToBeachAvailable$.combineLatest(_beachModel.beaches$).map((latestValues: any) => {
        if (latestValues[0] === DataStatus.AVAILABLE && latestValues[1]) {
          let foundBeachId: number = Array.from(latestValues[1])
            .map((beach: Beach) => {
              return beach.id;
            })
            .find((beachId: number) => {
              return this.getBeachDistance(beachId) === 0;
            });
          if (foundBeachId) {
            return _beachModel.getBeach(foundBeachId);
          }
          this._atBeach = null;
          this._setAtBeachAvailable(DataStatus.UNAVAILABLE);
          return null;
        } else {
          if (latestValues[0] === DataStatus.UNAVAILABLE) {
            this._atBeach = null;
            this._setAtBeachAvailable(DataStatus.UNAVAILABLE);
          }
          return null;
        }
      }
    );

    this.atBeach$.subscribe(atBeach => {
      if (atBeach) {
        this._atBeach = atBeach;
        this._setAtBeachAvailable(DataStatus.AVAILABLE);
      }
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

  getBeachDistance(beachid: number) {
    return this._beachDistanceMap.get(beachid);
  }

  getAtBeach(): Beach {
    return this._atBeach;
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
        if (error.code === 3) {
          // timeout
        }
        if (error.code === 2) {
          // googleapis no response
        }
        console.error('error location: ', error);
        if (this._watchId) {
          navigator.geolocation.clearWatch(this._watchId);
          this._watchId = null;
        }
        if (useDialog) {
          this._dialogRef.close('FAILURE');
        }
        this._store.dispatch(SpotSupplyActions.locationPermissionUpdated(LocationPermissionStatus.DENIED));
      }, {
        timeout: 5000,
        enableHighAccuracy: true,
        maximumAge: 5000
      });
  }

  private _setDistanceToBeachAvailable(dataStatus: DataStatus) {
    this._distanceToBeachAvailable = dataStatus;
    this.distanceToBeachAvailable$.next(this._distanceToBeachAvailable);
  }

  private _setAtBeachAvailable(dataStatus: DataStatus) {
    this._atBeachAvailable = dataStatus;
    this.atBeachAvailable$.next(this._atBeachAvailable);
  }
}
