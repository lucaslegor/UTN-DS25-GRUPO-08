import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

describe('ProductCard', () => {
  const productProps = {
    id: 1,
    title: 'Seguro de Auto',
    description: 'Protección completa para tu vehículo.',
    price: 10000,
    image: 'https://example.com/auto.jpg',
  };

  // Helper para renderizar ProductCard con los wrappers necesarios
  const renderProductCard = (props) => {
    render(
      <Router>
        <CartProvider>
          <ProductCard {...props} />
        </CartProvider>
      </Router>
    );
  };

  // Debería renderizar la información del producto correctamente
  it('renders product information correctly', () => {
    renderProductCard(productProps);

    expect(screen.getByText('Seguro de Auto')).toBeInTheDocument();
    expect(screen.getByText('Protección completa para tu vehículo.')).toBeInTheDocument();
    expect(screen.getByText('$10.000/año')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /seguro de auto/i })).toHaveAttribute('src', 'https://example.com/auto.jpg');
  });

  // No debería renderizar un enlace internamente, ya que espera que el padre maneje la navegación
  it('does not render a link internally, as it expects parent to handle navigation', () => {
    renderProductCard(productProps);

    // Verificar que el ProductCard en sí mismo no renderiza un enlace
    expect(screen.queryByRole('link', { name: /seguro de auto/i })).not.toBeInTheDocument();
  });
});
