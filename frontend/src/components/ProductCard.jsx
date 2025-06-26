import React from 'react';
import '../styles/productCard.css';

const ProductCard = ({ title, description, price, image }) => {
  return (
    <div className="product-card">
      <h2 className="product-title">{title}</h2>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <p className="product-description">{description}</p>
      <span className="product-price">{price}</span>
    </div>
  );
};
export default ProductCard; 