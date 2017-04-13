import { Action } from '@ngrx/store';

import { BEACHES_LOAD, USER_LOGIN, USER_LOGOUT } from '../spotsupply.actions';
import { Beach } from '../../../objects/beach/beach';
import { CreateUser } from '../../../objects/account/create-user';
import { LoginUser } from '../../../objects/account/login-user';

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
  }
};
