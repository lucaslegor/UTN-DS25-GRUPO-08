export interface CartItem {
  productId: number;
  cantidad: number;  
}

export interface Cart {
  idCarrito: string;          
  items: CartItem[];
  total: number;
  moneda: 'ARS';
  updatedAt: Date;
}

export interface AddToCartRequest {
  productId: number;
  cantidad?: number; 
}

export interface CartResponse {
  cart: Cart;
}
