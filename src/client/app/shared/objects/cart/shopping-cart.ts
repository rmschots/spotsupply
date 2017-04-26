import { CartItem } from './cart-item';
export class ShoppingCart {
  constructor(public id: number = -1,
              public beachId: number,
              public items: CartItem[] = [],
              public status: string = null,
              public price: number = 0) {
  }
}
