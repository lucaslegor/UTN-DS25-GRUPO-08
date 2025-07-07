import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { useCart } from '../context/cartContext'; 
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();
  const cartTotal = getCartTotal();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Tooltip title="Ver carrito" arrow>
      <IconButton
        onClick={handleCartClick}
        sx={{
          color: '#1e43c0',
          '&:hover': {
            backgroundColor: 'rgba(30, 67, 192, 0.1)',
          },
        }}
      >
        <Badge 
          badgeContent={cartTotal} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#ff4444',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
            },
          }}
        >
          <ShoppingCart sx={{ fontSize: 28 }} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default CartIcon;

 