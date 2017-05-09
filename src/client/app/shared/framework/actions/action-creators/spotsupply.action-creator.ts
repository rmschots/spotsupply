import { Action } from '@ngrx/store';

import {
  BEACHES_LOAD,
  CART_COMPLETE,
  CART_HISTORY_LOAD,
  CART_REFRESH, HAS_CART,
  LOCATION_PERMISSION_UPDATED,
  PERSISTED_CART_ADD_ITEM,
  PERSISTED_CART_LOAD,
  PERSISTED_CART_REMOVE_ALL_ITEMS,
  PERSISTED_CART_REMOVE_ITEM,
  PLACE_ORDER,
  PRODUCT_HIERARCHY,
  SHOPPING_CART_ADD_ITEM,
  SHOPPING_CART_LOAD,
  SHOPPING_CART_REMOVE_ALL_ITEMS,
  SHOPPING_CART_REMOVE_ITEM,
  USER_AT_BEACH,
  USER_LOGIN,
  USER_LOGOUT,
  USER_POSITION_UPDATED
} from '../spotsupply.actions';
import { Beach } from '../../../objects/beach/beach';
import { LoginUser } from '../../../objects/account/login-user';
import { LocationPermissionStatus } from '../../../objects/position/location-permission-status';
import { ProductCategory } from '../../../objects/product/product-category';
import { ShoppingCart } from '../../../objects/cart/shopping-cart';

export const SpotSupplyActions = {
  loadBeaches(payload: Array<Beach>): Action {
    return {
      type: BEACHES_LOAD,
      payload: payload
    };
  },
  loginUser(payload: LoginUser): Action {
    return {
      type: USER_LOGIN,
      payload: payload
    };
  },
  logoutUser(): Action {
    return {
      type: USER_LOGOUT,
      payload: null
    };
  },
  locationPermissionUpdated(payload: LocationPermissionStatus): Action {
    return {
      type: LOCATION_PERMISSION_UPDATED,
      payload: payload
    };
  },
  userPositionUpdated(payload: Position): Action {
    return {
      type: USER_POSITION_UPDATED,
      payload: payload
    };
  },
  userAtBeach(payload: Beach): Action {
    return {
      type: USER_AT_BEACH,
      payload: payload
    };
  },
  productHierarchy(payload: ProductCategory[]): Action {
    return {
      type: PRODUCT_HIERARCHY,
      payload: payload
    };
  },
  loadShoppingCart(payload: ShoppingCart): Action {
    return {
      type: SHOPPING_CART_LOAD,
      payload: payload
    };
  },
  loadPersistedCart(payload: ShoppingCart): Action {
    return {
      type: PERSISTED_CART_LOAD,
      payload: payload
    };
  },
  addItemToShoppingCart(payload: ShoppingCart): Action {
    return {
      type: SHOPPING_CART_ADD_ITEM,
      payload: payload
    };
  },
  addItemToPersistedCart(payload: ShoppingCart): Action {
    return {
      type: PERSISTED_CART_ADD_ITEM,
      payload: payload
    };
  },
  removeItemFromShoppingCart(payload: ShoppingCart): Action {
    return {
      type: SHOPPING_CART_REMOVE_ITEM,
      payload: payload
    };
  },
  removeItemFromPersistedCart(payload: ShoppingCart): Action {
    return {
      type: PERSISTED_CART_REMOVE_ITEM,
      payload: payload
    };
  },
  removeAllItemsFromShoppingCart(payload: ShoppingCart): Action {
    return {
      type: SHOPPING_CART_REMOVE_ALL_ITEMS,
      payload: payload
    };
  },
  removeAllItemsFromPersistedCart(payload: ShoppingCart): Action {
    return {
      type: PERSISTED_CART_REMOVE_ALL_ITEMS,
      payload: payload
    };
  },
  placeOrder(payload: ShoppingCart): Action {
    return {
      type: PLACE_ORDER,
      payload: payload
    };
  },
  cartRefresh(payload: ShoppingCart): Action {
    return {
      type: CART_REFRESH,
      payload: payload
    };
  },
  completeOrder(): Action {
    return {
      type: CART_COMPLETE
    };
  },
  loadCartHistory(payload: Array<ShoppingCart>): Action {
    return {
      type: CART_HISTORY_LOAD,
      payload: payload
    };
  },
  hasCart(payload: boolean): Action {
    return {
      type: HAS_CART,
      payload: payload
    };
  }
};
