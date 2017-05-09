import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { Beach } from '../../objects/beach/beach';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';

@Injectable()
export class BeachModel extends Model {
  beaches$: Observable<Array<Beach>>;

  private _beachMap: Map<number, string> = new Map();

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    this.beaches$ = this._store.select('beaches');
    this.beaches$.subscribe(beaches => {
      this._beachMap.clear();
      beaches.forEach(beach => {
        this._beachMap.set(beach.id, beach.name);
      });
    });
  }

  getBeach(id: number): Observable<Beach> {
    return this.beaches$.map((beaches: Array<Beach>) => beaches.find(beach => beach.id === id));
  }

  getBeachName(beachId: number): string {
    return this._beachMap.get(beachId);
  }

  loadBeaches() {
    this._restGateway.get('/beach').take(1).subscribe(data => {
      this._store.dispatch(SpotSupplyActions.loadBeaches(this.convertRestResponse(data)));
    });
  }
}
