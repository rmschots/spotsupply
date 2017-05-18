import { CartItem } from './cart-item';
import { DateTime } from '../datetime/datetime';
export class ShoppingCart {
  constructor(public id: number = -1,
              public beachId: number,
              public items: CartItem[] = [],
              public status: string = null,
              public price: number = 0,
              public orderDateTime: DateTime = null,
              public requestedTime: string = null,
              public deliveredDateTime: DateTime = null) {
  }
}
