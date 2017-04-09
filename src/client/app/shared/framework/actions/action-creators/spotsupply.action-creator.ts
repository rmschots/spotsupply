import { Action } from '@ngrx/store';

import { LOAD_BEACHES } from '../spotsupply.actions';
import { Beach } from '../../../objects/beach/beach';

export const SpotSupplyActions = {
  loadBeaches(payload: Array<Beach>): Action {
    return {
      type: LOAD_BEACHES,
      payload: payload
    };
  }
};
