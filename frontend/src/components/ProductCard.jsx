import React from 'react';
import { useCart } from '../context/CartContext';
import { Card, Button, CardContent, IconButton, AspectRatio, Typography } from '@mui/joy';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import '../styles/productCard.css';

const ProductCard = ({ id, title, description, price, image }) => {
  const { addToCart, isInCart, formatPrice } = useCart();
  const inCart = isInCart(id);


  return (
    <>
      <Card sx={{ width: 320, backgroundColor: 'transparent', borderColor:'#dbe1f0' }}>
        <div>
          <Typography level="title-lg" sx={{color: '#3877ffff'}}>{title}</Typography>
          <Typography level="body-sm">{description}</Typography>
        </div>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <img
            src={image}
            loading="lazy"
            alt={title || 'Imagen'}
          />
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography level="body-xs">Precio total:</Typography>
            <Typography className="product-price-horizontal" sx={{ fontSize: 'lg', fontWeight: 'lg', color:'#2e7d32' }}>{formatPrice(price)}</Typography>
          </div>
        </CardContent>
      </Card>


    </>

  );
};

export default ProductCard;
