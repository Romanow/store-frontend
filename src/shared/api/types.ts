export type OrderStatus = 'PROCESSED' | 'CANCELED';
export type WarrantyStatus = 'ON_WARRANTY' | 'TAKE_NEW' | 'REPAIR' | 'REMOVED_FROM_WARRANTY' | null;

export interface ItemInfo {
  name: string;
  count?: number;
  description?: string | null;
  manufacturer?: string | null;
  imageUrl?: string | null;
  warranty?: WarrantyResponse;
}

export interface WarrantyResponse {
  name: string;
  status: WarrantyStatus;
  comment?: string | null;
}

export interface OrderResponse {
  orderUid: string;
  userId: string;
  status: OrderStatus;
  orderDate: string;
  items: string[];
}

export interface DetailedOrderResponse extends Omit<OrderResponse, 'items'> {
  items: ItemInfo[];
}

export interface JwtClaims {
  name?: string;
  picture?: string;
  preferred_username?: string;
  sub?: string;
}
