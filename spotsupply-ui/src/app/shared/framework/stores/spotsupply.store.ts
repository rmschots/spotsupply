import * as immutable from 'immutable';
import { Product } from '../../objects/product/product';

export const initialState: immutable.Map<string, Object> = immutable.fromJS({
  beaches: [],
  login: {},
  location: {},
  product: { productMap: new Map<number, Product>() },
  cart: {},
  delivery: {}
});
