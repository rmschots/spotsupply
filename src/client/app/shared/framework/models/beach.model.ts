import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AsyncService } from '../async-services/base.async-service';
import { Model } from './base.model';
import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';

@Injectable()
export class BeachModel extends Model {
  games$: Observable<any>;
  game$: Observable<any>;

  constructor(protected _store: Store<any>,
              @Optional() @Inject(AsyncService) _services: AsyncService[]) {
    super(_services || []);
    this.games$ = this._store.select('beaches');
    this.game$ = this._store.select('beach');
  }

  getBeaches() {
    this.performAsyncAction(SpotSupplyActions.getBeaches())
      .subscribe((result: any) => {
        console.log(result);
      });
  }
}
