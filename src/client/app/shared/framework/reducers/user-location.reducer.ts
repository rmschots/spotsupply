import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { LOCATION_PERMISSION_UPDATED, USER_AT_BEACH, USER_POSITION_UPDATED } from '../actions/spotsupply.actions';

export const locationPermissionReducer = (state: any = initialState.get('locationPermissionStatus'), action: Action) => {
  switch (action.type) {
    case LOCATION_PERMISSION_UPDATED:
      return action.payload;
  }
  return state;
};

export const userPositionReducer = (state: any = initialState.get('lastKnownLocation'), action: Action) => {
  switch (action.type) {
    case USER_POSITION_UPDATED:
      return action.payload;
  }
  return state;
};

export const userAtBeachReducer = (state: any = initialState.get('atBeach'), action: Action) => {
  switch (action.type) {
    case USER_AT_BEACH:
      return action.payload;
  }
  return state;
};
