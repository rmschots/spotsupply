import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocationModel } from '../../framework/models/location.model';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { DataStatus } from '../gateway/data-status';

@Injectable()
export class AtBeachGuard implements CanActivate {

  constructor(private _locationModel: LocationModel,
              private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._locationModel.startFetchingLocation();
    return this._locationModel.atBeachAvailable$
      .combineLatest(this._locationModel.permission$, (atBeachStatus: DataStatus, permission: LocationPermissionStatus) => {
        if (permission === LocationPermissionStatus.DENIED || atBeachStatus === DataStatus.UNAVAILABLE) {
          return false;
        } else if (permission === LocationPermissionStatus.GRANTED && atBeachStatus === DataStatus.AVAILABLE) {
          return true;
        }
        return undefined;
      }).filter((result: boolean) => {
        return result !== undefined;
      }).map((success: boolean) => {
        if (!success) {
          this._router.navigate(['']);
        }
        return success;
      });
  }
}
