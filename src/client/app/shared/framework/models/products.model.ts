import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { ProductCategory } from '../../objects/product/product-category';
import { Product } from '../../objects/product/product';

@Injectable()
export class ProductsModel extends Model {
  productHierarchy$: Observable<Array<ProductCategory>>;
  productMap$: Observable<Map<number, Product>>;

  constructor(protected _store: Store<any>,
              private _restGateway: RestGatewayService) {
    super();
    let product$ = this._store.select('product');
    this.productHierarchy$ = product$.scan((accum: boolean, current: any) => {
      return (current && current.get('hierarchy')) || accum;
    }, false);
    this.productMap$ = product$.scan((accum: boolean, current: any) => {
      return (current && current.get('productMap')) || accum;
    }, false);
  }

  loadProductHierarchy() {
    this._restGateway.get('/product/productHierarchy').subscribe(data => {
      this._store.dispatch(SpotSupplyActions.productHierarchy(this.convertRestResponse(data)));
    });
  }
}
