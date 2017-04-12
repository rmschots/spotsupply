import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { USER_LOGIN } from '../actions/spotsupply.actions';

export const loginReducer = (state: any = initialState.get('login'), action: Action) => {
  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
  }
  return state;
};
