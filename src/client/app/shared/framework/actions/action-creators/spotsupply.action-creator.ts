import { Action } from '@ngrx/store';

import { BEACHES_LOAD, USER_LOGIN } from '../spotsupply.actions';
import { Beach } from '../../../objects/beach/beach';
import { CreateUser } from '../../../objects/account/create-user';

export const SpotSupplyActions = {
  loadBeaches(payload: Array<Beach>): Action {
    return {
      type: BEACHES_LOAD,
      payload: payload
    };
  },
  loginUser(payload: CreateUser): Action {
    return {
      type: USER_LOGIN,
      payload: payload
    };
  }
};
