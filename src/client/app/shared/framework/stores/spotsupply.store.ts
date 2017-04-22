import * as immutable from 'immutable';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';

export const initialState: immutable.Map<string, Object> = immutable.fromJS({
  beaches: [],
  login: null,
  loggedIn: false,
  locationPermissionStatus: LocationPermissionStatus.UNKNOWN,
  atBeach: null,
  lastKnownLocation: null,
  productHierarchy: []
});
