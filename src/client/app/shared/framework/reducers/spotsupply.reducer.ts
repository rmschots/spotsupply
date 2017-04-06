import { Action } from '@ngrx/store';
import { fromJS } from 'immutable';

import { initialState } from '../stores/spotsupply.store';
import { GET_BEACHES } from '../actions/spotsupply.actions';

export const spotSupplyReducer = (state: any = initialState.get('spotsupply'), action: Action) => {
  switch (action.type) {
    case GET_BEACHES:
      state.set('beaches', action.payload);
      state = state.push(fromJS(action.payload));
      break;
  }
  return state;
};
