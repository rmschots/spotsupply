import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import {
  PERSISTED_CART_ADD_ITEM,
  PERSISTED_CART_LOAD,
  PERSISTED_CART_REMOVE_ALL_ITEMS,
  PERSISTED_CART_REMOVE_ITEM,
  SHOPPING_CART_ADD_ITEM,
  SHOPPING_CART_LOAD,
  SHOPPING_CART_REMOVE_ALL_ITEMS,
  SHOPPING_CART_REMOVE_ITEM
} from '../actions/spotsupply.actions';

export function cartReducer(state: any = initialState.get('cart'), action: Action) {
  let cart;
  switch (action.type) {
    case SHOPPING_CART_LOAD:
      state = state.set('live', action.payload);
      break;
    case SHOPPING_CART_ADD_ITEM:
      state = state.set('live', action.payload);
      break;
    case SHOPPING_CART_REMOVE_ITEM:
      state = state.set('live', action.payload);
      break;
    case SHOPPING_CART_REMOVE_ALL_ITEMS:
      state = state.set('live', action.payload);
      break;
    case PERSISTED_CART_LOAD:
      state = state.set('persisted', action.payload);
      break;
    case PERSISTED_CART_ADD_ITEM:
      state = state.set('persisted', action.payload);
      break;
    case PERSISTED_CART_REMOVE_ITEM:
      state = state.set('persisted', action.payload);
      break;
    case PERSISTED_CART_REMOVE_ALL_ITEMS:
      state = state.set('persisted', action.payload);
      break;
  }
  return state;
}
