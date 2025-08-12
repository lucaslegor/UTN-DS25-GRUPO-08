export interface CartItem {
  productId: number;
  cantidad: number;  // default 1
}

export interface Cart {
  idCarrito: string;          // p.ej. uuid por sesión
  items: CartItem[];
  total: number;
  moneda: 'ARS';
  updatedAt: Date;
}

export interface AddToCartRequest {
  productId: number;
  cantidad?: number; // default 1
}

export interface CartResponse {
  cart: Cart;
}
