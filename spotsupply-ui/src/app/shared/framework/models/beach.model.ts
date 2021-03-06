import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { Beach } from '../../objects/beach/beach';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { DataStatus } from '../../services/gateway/data-status';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as immutable from 'immutable';
import { Coordinate } from '../../objects/position/position';

@Injectable()
export class BeachModel extends Model {
  beaches$: Observable<immutable.List<Beach>>;
  beachesAvailable$: BehaviorSubject<DataStatus> = new BehaviorSubject(DataStatus.UNKNOWN);

  private _beachMap: Map<number, Beach> = new Map();
  private _beachesAvailable = DataStatus.UNKNOWN;

  static getAreaBounds(paths: google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>): google.maps.LatLngBounds {
    const bounds = new google.maps.LatLngBounds();
    paths.forEach(path => {
      path.forEach(latLng => {
        bounds.extend(latLng);
      });
    });
    return bounds;
  }

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    this.beaches$ = this._store.select('beaches');
    this.beaches$.subscribe((beaches: immutable.List<Beach>) => {
      if (!!beaches && beaches.size > 0) {
        this._beachMap.clear();
        beaches.forEach(beach => {
          this._beachMap.set(beach.id, beach);
        });
        this._setBeachesAvailable(DataStatus.AVAILABLE);
      }
    });
  }

  getBeachObs(id: number): Observable<Beach> {
    return this.beaches$.map((beaches: immutable.List<Beach>) => beaches.find(beach => beach.id === id));
  }

  getBeach(id: number): Beach {
    return this._beachMap.get(id);
  }

  getBeachName(beachId: number): string {
    return this._beachMap.get(beachId).name;
  }

  getBeachCoordinates(beachId: number): Coordinate[] {
    return this._beachMap.get(beachId).coordinates;
  }

  loadBeaches() {
    if ([DataStatus.UNAVAILABLE, DataStatus.UNKNOWN].includes(this._beachesAvailable)) {
      this._setBeachesAvailable(DataStatus.LOADING);
      this._restGateway.get('/beach').take(1).subscribe(data => {
          this._store.dispatch(SpotSupplyActions.loadBeaches(this.convertRestResponse(data)));
        },
        () => {
          this._setBeachesAvailable(DataStatus.UNAVAILABLE);
        });
    } else {
      console.error('trying to load beaches while status is: ' + this._beachesAvailable);
    }
  }

  private _setBeachesAvailable(dataStatus: DataStatus) {
    this._beachesAvailable = dataStatus;
    this.beachesAvailable$.next(this._beachesAvailable);
  }
}
