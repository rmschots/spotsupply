import { initialState } from '../stores/spotsupply.store';
import { BEACH_DISTANCES, LOCATION_PERMISSION_UPDATED, USER_POSITION_UPDATED } from '../actions/spotsupply.actions';
import { ActionWithPayload } from '../actions/action-creators/spotsupply.action-creator';

export function locationReducer(state: any = initialState.get('location'), action: ActionWithPayload) {
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
  const strMap = new Map();
  for (const k of Object.keys(obj)) {
    strMap.set(+k, obj[k]);
  }
  return strMap;
}
