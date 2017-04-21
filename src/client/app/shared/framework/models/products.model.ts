import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { ProductCategory } from '../../objects/product/product-category';

@Injectable()
export class ProductsModel extends Model {
  productHierarchy$: Observable<Array<ProductCategory>>;

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    this.productHierarchy$ = this._store.select('productHierarchy');
  }

  loadProductHierarchy() {
    this._restGateway.get('/product/productHierarchy').subscribe(data => {
      this._store.dispatch(SpotSupplyActions.productHierarchy(this.convertRestResponse(data)));
    });
  }
}
