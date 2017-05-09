import { Action } from '@ngrx/store';

import { initialState } from '../stores/spotsupply.store';
import { BEACHES_LOAD } from '../actions/spotsupply.actions';
import { List } from 'immutable';

export function beachReducer(state: any = initialState.get('beaches'), action: Action) {
  switch (action.type) {
    case BEACHES_LOAD:
      state = List(action.payload);
  }
  return state;
}
