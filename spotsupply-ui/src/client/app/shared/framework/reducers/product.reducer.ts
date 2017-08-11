import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { PRODUCT_HIERARCHY, UNTYPED_PRODUCTS } from '../actions/spotsupply.actions';
import { ProductCategory } from '../../objects/product/product-category';
import { Product } from '../../objects/product/product';

export function productReducer(state: any = initialState.get('product'), action: Action) {
  switch (action.type) {
    case PRODUCT_HIERARCHY:
      state = state.set('hierarchy', action.payload);
      state = state.set('productMap', updateProductMapWithHierarchy(state.get('productMap'), action.payload));
      break;
    case UNTYPED_PRODUCTS:
      state = state.set('untypedProducts', action.payload);
      state = state.set('productMap', updateProductMapWithUntypedProducts(state.get('productMap'), action.payload));
  }
  return state;
}

function updateProductMapWithHierarchy(currentMap: Map<number, Product>, categories: ProductCategory[]): Map<number, Product> {
  categories.map((category) => category.types)
    .reduce(((types1, types2) => types1.concat(types2)), [])
    .map((type) => type.products)
    .reduce(((product1, product2) => product1.concat(product2)), [])
    .forEach((product: Product) => currentMap.set(product.id, product));
  return currentMap;
}

function updateProductMapWithUntypedProducts(currentMap: Map<number, Product>, untypedProducts: Array<Product>): Map<number, Product> {
  untypedProducts.forEach((product: Product) => currentMap.set(product.id, product));
  return currentMap;
}
