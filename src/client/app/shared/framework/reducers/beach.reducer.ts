import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { BEACHES_LOAD } from '../actions/spotsupply.actions';

export function beachReducer(state: any = initialState.get('beaches'), action: Action) {
  switch (action.type) {
    case BEACHES_LOAD:
      return action.payload;
  }
  return state;
}
