import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { PRODUCT_HIERARCHY } from '../actions/spotsupply.actions';

export const productReducer = (state: any = initialState.get('productHierarchy'), action: Action) => {
  switch (action.type) {
    case PRODUCT_HIERARCHY:
      return action.payload;
  }
  return state;
};
