import { initialState } from '../stores/spotsupply.store';
import { POSSIBLE_TIMES_LOAD } from '../actions/spotsupply.actions';
import { ActionWithPayload } from '../actions/action-creators/spotsupply.action-creator';

export function deliveryReducer(state: any = initialState.get('delivery'), action: ActionWithPayload) {
  switch (action.type) {
    case POSSIBLE_TIMES_LOAD:
      state = state.set('possibleTimes', action.payload);
      break;
  }
  return state;
}
