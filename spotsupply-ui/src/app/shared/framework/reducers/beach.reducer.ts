import { initialState } from '../stores/spotsupply.store';
import { BEACHES_LOAD } from '../actions/spotsupply.actions';
import * as immutable from 'immutable';
import { ActionWithPayload } from '../actions/action-creators/spotsupply.action-creator';

export function beachReducer(state: any = initialState.get('beaches'), action: ActionWithPayload) {
  switch (action.type) {
    case BEACHES_LOAD:
      state = immutable.List(action.payload);
  }
  return state;
}
