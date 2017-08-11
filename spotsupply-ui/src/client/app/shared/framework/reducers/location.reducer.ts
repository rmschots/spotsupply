import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { BEACH_DISTANCES, LOCATION_PERMISSION_UPDATED, USER_POSITION_UPDATED } from '../actions/spotsupply.actions';

export function locationReducer(state: any = initialState.get('location'), action: Action) {
  switch (action.type) {
    case LOCATION_PERMISSION_UPDATED:
      state = state.set('permission', action.payload);
      break;
    case USER_POSITION_UPDATED:
      state = state.set('position', action.payload);
      break;
    case BEACH_DISTANCES:
      state = state.set('beachDistances', objToStrMap(action.payload));
      break;
  }
  return state;
}

export function objToStrMap(obj: any) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(+k, obj[k]);
  }
  return strMap;
}
