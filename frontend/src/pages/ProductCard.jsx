import React from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/productCard.css';

const ProductCardPage = () => {
  const product = {
    title: 'ProductCard 1',
    description: 'Este es un producto muy interesante que podés agregar al carrito.',
    price: '$1900',
    image: '/messi.png',
  };

  return (
    <div className="product-detail-container">
      <ProductCard {...product} />
    </div>
  );
};

export default ProductCardPage;
