import { Action } from '@ngrx/store';

import {
  BEACH_DISTANCES,
  BEACHES_LOAD,
  CART_COMPLETE,
  CART_HISTORY_LOAD,
  CART_REFRESH,
  LOCATION_PERMISSION_UPDATED,
  PERSISTED_CART_ADD_ITEM,
  PERSISTED_CART_LOAD,
  PERSISTED_CART_REMOVE_ALL_ITEMS,
  PERSISTED_CART_REMOVE_ITEM,
  PLACE_ORDER,
  POSSIBLE_TIMES_LOAD,
  PRODUCT_HIERARCHY,
  SHOPPING_CART_ADD_ITEM,
  SHOPPING_CART_LOAD,
  SHOPPING_CART_REMOVE_ALL_ITEMS,
  SHOPPING_CART_REMOVE_ITEM, UNTYPED_PRODUCTS,
  USER_LOGIN,
  USER_LOGOUT,
  USER_POSITION_UPDATED
} from '../spotsupply.actions';
import { Beach } from '../../../objects/beach/beach';
import { LoginUser } from '../../../objects/account/login-user';
import { LocationPermissionStatus } from '../../../objects/position/location-permission-status';
import { ProductCategory } from '../../../objects/product/product-category';
import { ShoppingCart } from '../../../objects/cart/shopping-cart';
import { Product } from '../../../objects/product/product';

export interface ActionWithPayload extends Action {
  payload?: any;
}

export const SpotSupplyActions = {
  loadBeaches(payload: Array<Beach>): ActionWithPayload {
    return {
      type: BEACHES_LOAD,
      payload: payload
    };
  },
  loginUser(payload: LoginUser): ActionWithPayload {
    return {
      type: USER_LOGIN,
      payload: payload
    };
  },
  logoutUser(): ActionWithPayload {
    return {
      type: USER_LOGOUT,
      payload: null
    };
  },
  locationPermissionUpdated(payload: LocationPermissionStatus): ActionWithPayload {
    return {
      type: LOCATION_PERMISSION_UPDATED,
      payload: payload
    };
  },
  userPositionUpdated(payload: Position): ActionWithPayload {
    return {
      type: USER_POSITION_UPDATED,
      payload: payload
    };
  },
  updateBeachDistances(payload: Beach): ActionWithPayload {
    return {
      type: BEACH_DISTANCES,
      payload: payload
    };
  },
  productHierarchy(payload: ProductCategory[]): ActionWithPayload {
    return {
      type: PRODUCT_HIERARCHY,
      payload: payload
    };
  },
  untypedProducts(payload: Array<Product>): ActionWithPayload {
    return {
      type: UNTYPED_PRODUCTS,
      payload: payload
    };
  },
  loadShoppingCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: SHOPPING_CART_LOAD,
      payload: payload
    };
  },
  loadPersistedCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: PERSISTED_CART_LOAD,
      payload: payload
    };
  },
  addItemToShoppingCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: SHOPPING_CART_ADD_ITEM,
      payload: payload
    };
  },
  addItemToPersistedCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: PERSISTED_CART_ADD_ITEM,
      payload: payload
    };
  },
  removeItemFromShoppingCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: SHOPPING_CART_REMOVE_ITEM,
      payload: payload
    };
  },
  removeItemFromPersistedCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: PERSISTED_CART_REMOVE_ITEM,
      payload: payload
    };
  },
  removeAllItemsFromShoppingCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: SHOPPING_CART_REMOVE_ALL_ITEMS,
      payload: payload
    };
  },
  removeAllItemsFromPersistedCart(payload: ShoppingCart): ActionWithPayload {
    return {
      type: PERSISTED_CART_REMOVE_ALL_ITEMS,
      payload: payload
    };
  },
  placeOrder(payload: ShoppingCart): ActionWithPayload {
    return {
      type: PLACE_ORDER,
      payload: payload
    };
  },
  cartRefresh(payload: ShoppingCart): ActionWithPayload {
    return {
      type: CART_REFRESH,
      payload: payload
    };
  },
  completeOrder(): ActionWithPayload {
    return {
      type: CART_COMPLETE
    };
  },
  loadCartHistory(payload: Array<ShoppingCart>): ActionWithPayload {
    return {
      type: CART_HISTORY_LOAD,
      payload: payload
    };
  },
  loadPossibleTimes(payload: Array<string>): ActionWithPayload {
    return {
      type: POSSIBLE_TIMES_LOAD,
      payload: payload
    };
  }
};
