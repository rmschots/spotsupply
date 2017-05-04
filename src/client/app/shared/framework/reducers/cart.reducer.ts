import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import {
  CART_COMPLETE, CART_HISTORY_LOAD,
  CART_REFRESH,
  PERSISTED_CART_ADD_ITEM,
  PERSISTED_CART_LOAD,
  PERSISTED_CART_REMOVE_ALL_ITEMS,
  PERSISTED_CART_REMOVE_ITEM,
  PLACE_ORDER,
  SHOPPING_CART_ADD_ITEM,
  SHOPPING_CART_LOAD,
  SHOPPING_CART_REMOVE_ALL_ITEMS,
  SHOPPING_CART_REMOVE_ITEM
} from '../actions/spotsupply.actions';
import { ShoppingCart } from '../../objects/cart/shopping-cart';

export function cartReducer(state: any = initialState.get('cart'), action: Action) {
  let cart;
  switch (action.type) {
    case SHOPPING_CART_LOAD:
      state = state.set('live', action.payload);
      state = updateOrderedState(state, action.payload);
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
      state = updateOrderedState(state, action.payload);
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
    case PLACE_ORDER:
      state = state.set('persisted', action.payload);
      state = state.set('live', action.payload);
      state = state.set('ordered', true);
      break;
    case CART_REFRESH:
      state = state.set('persisted', action.payload);
      state = state.set('live', action.payload);
      state = updateOrderedState(state, action.payload);
      break;
    case CART_COMPLETE:
      state = state.set('persisted', null);
      state = state.set('live', null);
      state = state.set('ordered', false);
      break;
    case CART_HISTORY_LOAD:
      state = state.set('history', action.payload);
      break;
  }
  return state;
}

export function updateOrderedState(state: any, cart: ShoppingCart) {
  if (cart) {
    state = state.set('ordered', cart.status === 'ORDERED');
  } else {
    state = state.set('ordered', false);
  }
  return state;
}
