import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MdDialogConfig, MdDialog } from '@angular/material';
import { LocationLoadingComponent } from './components/location-loading.component';
import { LocationPermissionStatus } from './objects/location-permission-status';

@Injectable()
export class LocationService {

  private static dialogOptions: MdDialogConfig = {
    disableClose: true
  };

  private _isInBounds: boolean = false;
  private _inBoundsSubject = new Subject<boolean>();

  private _lastKnownPosition: Position;
  private _positionSubject = new Subject<Position>();
  private _positionError: PositionError = null;
  private _positionErrorSubject = new Subject<PositionError>();

  private _permissionStatus: LocationPermissionStatus = LocationPermissionStatus.UNKNOWN;

  constructor(private dialog: MdDialog) {
  }

  startFetchingLocation() {
    if (this.permissionStatus !== LocationPermissionStatus.GRANTED) {
      let dialogRef = this.dialog.open(LocationLoadingComponent, LocationService.dialogOptions);
      navigator.geolocation.watchPosition((location) => {
          this.permissionStatus = LocationPermissionStatus.GRANTED;
          this.lastKnownPosition = location;
          this.isInBounds = true;
          dialogRef.close('SUCCESS');
        },
        (error: PositionError) => {
          this.permissionStatus = LocationPermissionStatus.DENIED;
          this.positionError = error;
          this.isInBounds = false;
          dialogRef.close('FAILURE');
        }, {
          timeout: 20000,
          enableHighAccuracy: true
        });
    }
  }

  inBoundsSubscription(obs: ((value: boolean) => void)) {
    this._inBoundsSubject.subscribe(obs);
  }

  positionSubscription(obs: ((value: Position) => void)) {
    this._positionSubject.subscribe(obs);
  }

  positionErrorSubscription(obs: ((value: PositionError) => void)) {
    this._positionErrorSubject.subscribe(obs);
  }

  get isInBounds(): boolean {
    return this._isInBounds;
  }

  set isInBounds(value: boolean) {
    this._isInBounds = value;
    this._inBoundsSubject.next(this._isInBounds);
  }

  get lastKnownPosition(): Position {
    return this._lastKnownPosition;
  }

  set lastKnownPosition(value: Position) {
    this._lastKnownPosition = value;
    this._positionSubject.next(this._lastKnownPosition);
  }

  get positionError(): PositionError {
    return this._positionError;
  }

  set positionError(value: PositionError) {
    this._positionError = value;
    this._positionErrorSubject.next(this._positionError);
  }

  get permissionStatus(): LocationPermissionStatus {
    return this._permissionStatus;
  }

  set permissionStatus(value: LocationPermissionStatus) {
    this._permissionStatus = value;
  }
}

