import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { LOCATION_PERMISSION_UPDATED, USER_AT_BEACH, USER_POSITION_UPDATED } from '../actions/spotsupply.actions';

export function locationReducer(state: any = initialState.get('location'), action: Action) {
  switch (action.type) {
    case LOCATION_PERMISSION_UPDATED:
      state = state.set('permission', action.payload);
      break;
    case USER_POSITION_UPDATED:
      state = state.set('position', action.payload);
      break;
    case USER_AT_BEACH:
      state = state.set('atBeach', action.payload);
      break;
  }
  return state;
}
