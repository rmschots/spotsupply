import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Http } from '@angular/http';
import { Config } from '../../config/env.config';
import { Model } from './model';
import { Beach } from '../../objects/beach/beach';

@Injectable()
export class BeachModel extends Model {
  beaches$: Observable<Array<Beach>>;

  constructor(protected _store: Store<any>,
              private http: Http) {
    super();
    this.beaches$ = this._store.select('beaches');
  }

  loadBeaches() {
    this.http.get(Config.REST_API + '/beach').subscribe(data => {
      this._store.dispatch(SpotSupplyActions.loadBeaches(this.convertRestResponse(data)));
    });
  }
}
