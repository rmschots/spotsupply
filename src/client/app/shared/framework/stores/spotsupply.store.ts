import * as immutable from 'immutable';

export const initialState: immutable.Map<string, Object> = immutable.fromJS({
  beaches: [],
  login: {},
  location: {},
  product: {},
  cart: {}
});
