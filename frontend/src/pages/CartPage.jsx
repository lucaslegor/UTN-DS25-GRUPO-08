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
  ArrowBack,
  Clear
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/cartPage.css';
import { formatPrice } from '../utils/formatPrice';


const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartPriceTotal,
    isCartEmpty 
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    // Aquí iría la lógica de checkout
    alert('Funcionalidad de checkout proximamente');
  };
  

  if (isCartEmpty) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', marginTop: '5rem' }}>
          <ShoppingCart sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Agrega algunos productos para comenzar
          </Typography>
          <Button 
            variant="outlined" 
            color='primary'
            size="large"
            onClick={() => navigate('/')}
            startIcon={<ArrowBack />}
          >
            Volver al inicio
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          Carrito de Compras
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="outlined" 
          color="error"
          startIcon={<Clear />}
          onClick={clearCart}
        >
          Vaciar carrito
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Lista de productos */}
        <Box sx={{ flex: 1 }}>
          {cartItems.map((item) => (
            <Paper key={item.id} elevation={2} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Imagen */}
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
                
                {/* Información del producto */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {formatPrice(item.price)}
                  </Typography>
                </Box>

                {/* Controles de cantidad */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                    disabled={item.quantity >= 10}
                  >
                    <Add />
                  </IconButton>
                </Box>

                {/* Botón eliminar */}
                <IconButton 
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Resumen del carrito */}
        <Paper elevation={3} sx={{ p: 3, height: 'fit-content', minWidth: 300 }}>
          <Typography variant="h5" gutterBottom>
            Resumen del pedido
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              Productos: {getCartTotal()}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">
              Total: {formatPrice(getCartPriceTotal())}
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
          
          <Button 
            variant="outlined" 
            fullWidth
            onClick={() => navigate('/')}
          >
            Continuar comprando
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default CartPage; 