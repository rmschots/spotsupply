import { Action } from '@ngrx/store';

import { GET_BEACHES } from '../spotsupply.actions';

export const SpotSupplyActions = {
  getBeaches(): Action {
    return {
      payload: null,
      type: GET_BEACHES
    };
  }
};
