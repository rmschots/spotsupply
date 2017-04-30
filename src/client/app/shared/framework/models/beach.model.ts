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

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    this.beaches$ = this._store.select('beaches');
  }

  getBeach(id: number) {
    return this.beaches$.map(( beaches: Array<Beach>) => beaches.find(beach => beach.id === id));
  }

  loadBeaches() {
    this._restGateway.get('/beach').subscribe(data => {
      this._store.dispatch(SpotSupplyActions.loadBeaches(this.convertRestResponse(data)));
    });
  }
}
