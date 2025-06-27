import React from 'react';
import '../styles/productCard.css';

const ProductCard = ({ title, description, price, image }) => {
  return (
    <div className="product-card-horizontal">
      <div className="product-image-horizontal">
        <img src={image} alt={title} />
      </div>
      <div className="product-details-horizontal">
        <h3 className="product-title-horizontal">{title}</h3>
        <p className="product-description-horizontal">{description}</p>
        <div className="product-footer-horizontal">
          <span className="product-price-horizontal">{price}</span>
          <button className="product-button-horizontal">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
