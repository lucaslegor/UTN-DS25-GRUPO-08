import React from 'react';
import { Button, Typography, Box, Container, Paper } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import '../styles/productCard.css';
import { useParams } from 'react-router-dom';
import '../styles/productCard.css';

const defaultProducts = [
  {
    id: 1,
    title: "Seguro de Auto",
    description: "Protección completa para tu vehículo ante accidentes, robos y daños a terceros.",
    price: "$10.000/año",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Seguro de Hogar",
    description: "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
    price: "$8.000/año",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Seguro de Vida",
    description: "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
    price: "$12.000/año",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Seguro de Salud",
    description: "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
    price: "$15.000/año",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80"
  }
];


const formatPrice = (price) => {
  if (!price) return 'Consultar';
  if (typeof price === 'string' && price.includes('$')) return price;
  return `$${Number(price).toLocaleString('es-AR')}/año`;
};

const ProductCardPage = () => {

  const { id } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const parsedProducts = storedProducts ? JSON.parse(storedProducts) : [];
    const allProducts = [...defaultProducts, ...parsedProducts];
    const foundProduct = allProducts.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem'
      }}>
        Producto no encontrado
      </div>
    );
  }


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
