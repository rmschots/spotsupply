import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { USER_LOGIN, USER_LOGOUT } from '../actions/spotsupply.actions';
import { ActionWithPayload } from '../actions/action-creators/spotsupply.action-creator';

export function loginReducer(state: any = initialState.get('login'), action: ActionWithPayload) {
  switch (action.type) {
    case USER_LOGIN:
      state = state.set('details', action.payload);
      break;
    case USER_LOGOUT:
      state = state.remove('details');
      break;
  }
  return state;
}
