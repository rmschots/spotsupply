import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { USER_LOGIN, USER_LOGOUT } from '../actions/spotsupply.actions';

export function loginReducer(state: any = initialState.get('login'), action: Action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
    case USER_LOGOUT:
      return null;
  }
  return state;
}
