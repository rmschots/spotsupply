import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { POSSIBLE_TIMES_LOAD } from '../actions/spotsupply.actions';

export function deliveryReducer(state: any = initialState.get('delivery'), action: Action) {
  switch (action.type) {
    case POSSIBLE_TIMES_LOAD:
      state = state.set('possibleTimes', action.payload);
      break;
  }
  return state;
}
