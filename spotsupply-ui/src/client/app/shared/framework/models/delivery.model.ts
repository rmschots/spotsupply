import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';

@Injectable()
export class DeliveryModel extends Model {

  possibleTimes$: Observable<Array<string>>;

  constructor(private _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    let delivery$ = this._store.select('delivery');
    this.possibleTimes$ = delivery$.map((current: any) => {
      return current.get('possibleTimes');
    });
  }

  refreshPossibleTimes(): Observable<boolean> {
    this._store.dispatch(SpotSupplyActions.loadPossibleTimes([]));
    return this._restGateway.get('/delivery/possibleTimes')
      .take(1)
      .map(data => {
          this._store.dispatch(SpotSupplyActions.loadPossibleTimes(this.convertRestResponse(data)));
          return true;
        });
  }

}
