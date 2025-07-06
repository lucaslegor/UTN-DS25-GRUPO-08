import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/cartIcon.css';

const CartIcon = () => {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();
  const cartTotal = getCartTotal();

  return (
    <div className="cart-icon-container" onClick={() => navigate('/cart')}>
      <ShoppingCart className="cart-icon" />
      {cartTotal > 0 && (
        <span className="cart-badge">{cartTotal}</span>
      )}
    </div>
  );
};

export default CartIcon;