import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocationModel } from '../../framework/models/location.model';
import { Beach } from '../../objects/beach/beach';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';

@Injectable()
export class AtBeachGuard implements CanActivate {

  constructor(private _locationModel: LocationModel,
              private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._locationModel.startFetchingLocation();
    return this._locationModel.atBeach$
      .combineLatest(this._locationModel.permission$, (atBeach: Beach, permission: LocationPermissionStatus) => {
        if (permission === LocationPermissionStatus.DENIED) {
          return false;
        } else if (permission === LocationPermissionStatus.GRANTED && !!atBeach) {
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
