import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { PRODUCT_HIERARCHY } from '../actions/spotsupply.actions';
import { ProductCategory } from '../../objects/product/product-category';
import { Product } from '../../objects/product/product';

export function productReducer(state: any = initialState.get('product'), action: Action) {
  switch (action.type) {
    case PRODUCT_HIERARCHY:
      state = state.set('hierarchy', action.payload);
      state = state.set('productMap', generateProductMap(action.payload));
      break;
  }
  return state;
}

function generateProductMap(categories: ProductCategory[]): Map<number, Product> {
  let tmp: [number, Product][] = categories
    .map((category) => {
      return category.types;
    })
    .reduce(((types1, types2) => types1.concat(types2)), [])
    .map((type) => {
      return type.products;
    })
    .reduce(((product1, product2) => product1.concat(product2)), [])
    .map((i) => <[number, Product]>[i.id, i]);
  return new Map<number, Product>(tmp);
}
