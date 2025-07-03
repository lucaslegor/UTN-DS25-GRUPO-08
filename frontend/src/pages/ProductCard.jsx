import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/productCard.css';

const products = Array.from({ length: 32 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `ProductCard ${i + 1}`,
  description: `Descripción del producto ${i + 1}`,
  price: `$${1000 + i * 100}`,
  image: '/messi.png',
}));

const ProductCardPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

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