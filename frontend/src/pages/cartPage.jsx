import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Button, 
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import { 
  Add, 
  Remove, 
  Delete, 
  ShoppingCart,
  ArrowBack
} from '@mui/icons-material';
import { useCart } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartPriceTotal,
    formatPrice
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    // Aquí iría la lógica de checkout
    alert('Funcionalidad de checkout próximamente');
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box textAlign="center" py={8}>
          <ShoppingCart sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
          <Typography variant="h4" color="text.secondary" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Agrega algunos productos para comenzar
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/')}
            startIcon={<ArrowBack />}
          >
            Volver al inicio
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          Carrito de Compras
        </Typography>
      </Box>

      <Box display="flex" gap={3} flexDirection={{ xs: 'column', lg: 'row' }}>
        {/* Lista de productos */}
        <Box flex={1}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Productos ({getCartTotal()} {getCartTotal() === 1 ? 'item' : 'items'})
            </Typography>
            
            {cartItems.map((item) => (
              <Box key={item.id} mb={3}>
                <Box display="flex" gap={2} alignItems="center">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{ 
                      width: 80, 
                      height: 80, 
                      objectFit: 'cover',
                      borderRadius: 8 
                    }}
                  />
                  
                  <Box flex={1}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatPrice(item.price)}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    
                    <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    
                    <IconButton 
                      size="small"
                      onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    >
                      <Add />
                    </IconButton>
                    
                    <IconButton 
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                {cartItems.indexOf(item) < cartItems.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))}

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Button 
                variant="outlined" 
                color="error"
                onClick={handleClearCart}
              >
                Vaciar carrito
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Resumen */}
        <Box width={{ xs: '100%', lg: 350 }}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del pedido
            </Typography>
            
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Subtotal:</Typography>
              <Typography>{formatPrice(getCartPriceTotal())}</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Envío:</Typography>
              <Typography color="success.main">Gratis</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                {formatPrice(getCartPriceTotal())}
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              onClick={handleCheckout}
              sx={{ mb: 2 }}
            >
              Proceder al pago
            </Button>

            <Alert severity="info" sx={{ fontSize: '0.875rem' }}>
              Los precios incluyen todos los impuestos aplicables
            </Alert>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage; 