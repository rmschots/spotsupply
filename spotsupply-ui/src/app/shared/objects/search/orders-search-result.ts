import { Order } from '../order/order';
export class OrdersSearchResult {
  orders: Order[];
  pages: number;
  page: number;
  filter: string;
  totalResults: number;
  pageSize: number;
}
