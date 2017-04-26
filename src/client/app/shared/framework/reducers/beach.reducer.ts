import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { BEACHES_LOAD } from '../actions/spotsupply.actions';
import { Beach } from '../../objects/beach/beach';

export function beachReducer(state: any = initialState.get('beaches'), action: Action) {
  switch (action.type) {
    case BEACHES_LOAD:
      state.length = 0;
      action.payload.forEach((beach: Beach) => {
        state = state.push(beach);
      });
  }
  return state;
}
