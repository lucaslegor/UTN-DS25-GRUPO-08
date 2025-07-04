import React from 'react';
import '../styles/productCard.css';

const formatPrice = (price) => {
  if (!price) return 'Consultar';
  if (typeof price === 'string' && price.includes('$')) return price;
  return `$${Number(price).toLocaleString('es-AR')}/año`;
};

const ProductCard = ({ title, description, price, image }) => {
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
          <button className="product-button-horizontal">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
