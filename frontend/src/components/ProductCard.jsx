import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/productCard.css';

const ProductCard = ({ id, title, description, price, image }) => {
  const { addToCart, isInCart, formatPrice } = useCart();
  const inCart = isInCart(id);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevenir navegación al hacer click
    addToCart({ id, title, description, price, image });
  };

  return (
    <div className="product-card-horizontal">
      <div className="product-image-horizontal">
        <img src={image} alt={title || 'Imagen'} />
      </div>
      <div className="product-details-horizontal">
        <h3 className="product-title-horizontal">{title || 'Sin título'}</h3>
        <p className="product-description-horizontal">{description || 'Sin descripción.'}</p>
        <div className="product-footer-horizontal">
          <span className="product-price-horizontal">{formatPrice(price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
