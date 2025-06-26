import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/productCard.css';

const ProductCardPage = () => {
  // Simulación de datos de producto
  const product = {
    title: 'Nombre del producto',
    description: 'Descripción detallada del producto que puede incluir características, beneficios y otros detalles.',
    price: '$1234',
    image: './messi.png',
  };

  return (
    <div>
     
      <main>
        <div className="product-detail-container">
          <ProductCard {...product} />
          <div className="product-info">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {/*<p className="product-price">{product.price}</p>*/}
            <div className="product-actions">
              <button id="addToCartButton">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProductCardPage; 