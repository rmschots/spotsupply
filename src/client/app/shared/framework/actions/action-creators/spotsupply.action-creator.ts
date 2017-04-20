import { Action } from '@ngrx/store';

import {
  BEACHES_LOAD,
  LOCATION_PERMISSION_UPDATED,
  USER_AT_BEACH,
  USER_LOGIN,
  USER_LOGOUT,
  USER_POSITION_UPDATED
} from '../spotsupply.actions';
import { Beach } from '../../../objects/beach/beach';
import { LoginUser } from '../../../objects/account/login-user';
import { LocationPermissionStatus } from '../../../objects/position/location-permission-status';

export const SpotSupplyActions = {
  loadBeaches(payload: Array<Beach>): Action {
    return {
      type: BEACHES_LOAD,
      payload: payload
    };
  },
  loginUser(payload: LoginUser): Action {
    return {
      type: USER_LOGIN,
      payload: payload
    };
  },
  logoutUser(): Action {
    return {
      type: USER_LOGOUT,
      payload: null
    };
  },
  locationPermissionUpdated(payload: LocationPermissionStatus): Action {
    return {
      type: LOCATION_PERMISSION_UPDATED,
      payload: payload
    };
  },
  userPositionUpdated(payload: Position): Action {
    return {
      type: USER_POSITION_UPDATED,
      payload: payload
    };
  },
  userAtBeach(payload: Beach): Action {
    return {
      type: USER_AT_BEACH,
      payload: payload
    };
  }
};
