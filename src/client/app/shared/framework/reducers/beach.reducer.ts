import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { LOAD_BEACHES } from '../actions/spotsupply.actions';

export const beachReducer = (state: any = initialState.get('beaches'), action: Action) => {
  switch (action.type) {
    case LOAD_BEACHES:
      return action.payload;
  }
  return state;
};
