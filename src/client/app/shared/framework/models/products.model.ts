import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SpotSupplyActions } from '../actions/action-creators/spotsupply.action-creator';
import { Model } from './model';
import { RestGatewayService } from '../../services/gateway/rest-gateway.service';
import { ProductCategory } from '../../objects/product/product-category';
import { Product } from '../../objects/product/product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataStatus } from '../../services/gateway/data-status';
import { ProductType } from '../../objects/product/product-type';

@Injectable()
export class ProductsModel extends Model {
  productHierarchy$: Observable<Array<ProductCategory>>;
  productMap$: Observable<Map<number, Product>>;
  productTypeMap$: BehaviorSubject<Map<number, Array<ProductType>>> = new BehaviorSubject(new Map());

  productsAvailable$ = new BehaviorSubject<DataStatus>(DataStatus.UNKNOWN);

  private _productsAvailable: DataStatus = DataStatus.UNKNOWN;

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

    this.productHierarchy$.subscribe(hierarchy => {
      if (!!hierarchy) {
        const map = new Map<number, Array<ProductType>>();
        hierarchy.map(cat => {
          return cat.types;
        }).forEach(types => types.forEach(type => type.products.forEach(product => {
          if (map.has(product.id)) {
            map.get(product.id).push(type);
          } else {
            map.set(product.id, [type]);
          }
        })));
        this.productTypeMap$.next(map);
        this._setProductsAvailable(DataStatus.AVAILABLE);
      } else {
        this.productTypeMap$.next(new Map());
      }
    });
  }

  loadProductHierarchy() {
    if ([DataStatus.UNAVAILABLE, DataStatus.UNKNOWN].includes(this._productsAvailable)) {
      this._setProductsAvailable(DataStatus.LOADING);
      this._restGateway.get('/product/productHierarchy').take(1).subscribe(
        data => {
          this._store.dispatch(SpotSupplyActions.productHierarchy(this.convertRestResponse(data)));
        },
        () => {
          this._setProductsAvailable(DataStatus.UNAVAILABLE);
        });
    } else {
      console.error('Tried loading product hierarchy while one already exists');
    }
  }

  invalidate() {
    this._setProductsAvailable(DataStatus.UNKNOWN);
    this.loadProductHierarchy();
  }

  private _setProductsAvailable(dataStatus: DataStatus) {
    this._productsAvailable = dataStatus;
    this.productsAvailable$.next(this._productsAvailable);
  }
}
