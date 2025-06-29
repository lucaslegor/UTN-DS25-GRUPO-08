import React from 'react';
import { Button, Typography, Box, Container, Paper } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import '../styles/productCard.css';

const formatPrice = (price) => {
  if (!price) return 'Consultar';
  if (typeof price === 'string' && price.includes('$')) return price;
  return `$${Number(price).toLocaleString('es-AR')}/año`;
};

const ProductCardPage = () => {
  const product = {
    title: 'ProductCard 1',
    description: 'Este es un producto muy interesante que podés agregar al carrito. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    price: '$1900',
    image: '/messi.png',
  };

  const handleAddToCart = () => {
    console.log('Producto agregado al carrito:', product.title);
    // Aquí iría la lógica para agregar al carrito
  };

  return (
    <div className="product-detail-container">
      <Container maxWidth="lg">
        <Paper elevation={3} className="product-detail-paper">
          <div className="product-detail-layout">
            {/* Imagen del producto */}
            <div className="product-image-section">
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-detail-image"
              />
            </div>
            
            {/* Detalles del producto */}
            <div className="product-info-section">
              <Typography variant="h3" component="h1" className="product-detail-title">
                {product.title}
              </Typography>
              
              <Typography variant="body1" className="product-detail-description">
                {product.description}
              </Typography>
              
              <Box className="product-price-section">
                <Typography variant="h4" component="span" className="product-detail-price">
                  {formatPrice(product.price)}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                className="add-to-cart-button"
                fullWidth
              >
                Agregar al carrito
              </Button>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default ProductCardPage;
