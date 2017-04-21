import { fromJS, Map } from 'immutable';
import { LocationPermissionStatus } from '../../objects/position/location-permission-status';
import { Beach } from '../../objects/beach/beach';

export const initialState: Map<string, Object> = fromJS({
  beaches: [],
  login: null,
  loggedIn: false,
  locationPermissionStatus: LocationPermissionStatus.UNKNOWN,
  atBeach: null,
  lastKnownLocation: null,
  productHierarchy: []
});
