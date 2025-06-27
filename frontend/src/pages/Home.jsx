import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import ProductCard from '../components/ProductCard';
import NavButton from '../components/NavButton';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const navigate = useNavigate();
  // Simulación de productos para el catálogo
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `ProductCard ${i + 1}`,
    description: `Descripción del producto ${i + 1}`,
    price: `$${(1000 + i * 100)}`,
    image: '/messi.png',
  }));
 
  return (
    <>
      <nav className="page-nav" style={{ justifyContent: 'center' }}>
        <NavButton
          image="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
          icon={InfoIcon}
          label="About Us"
          onClick={() => navigate('/nosotros')}
        />
        <NavButton
          image="https://plus.unsplash.com/premium_photo-1661434758776-faf568a8a34f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          icon={ShoppingCartIcon}
          label="Carrito"
          onClick={() => alert('Ir al carrito (próximamente)')}
        />
        <NavButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"
          icon={AccountCircleIcon}
          label="Mi Perfil"
          onClick={() => navigate('/userProfile')} 
        />
      </nav>

      <section className="filters" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <SearchIcon style={{ position: 'absolute', left: 10, color: 'var(--primary-color, #1e43c0)', fontSize: 24 }} />
          <input
            type="text"
            placeholder="Buscar productos..."
            style={{ paddingLeft: 36, minWidth: 220 }}
          />
        </div>
        <input type="text" placeholder="Filtros" style={{ minWidth: 120 }} />
        <div className="filter-buttons">
          <button>Seguros</button>
          <button>Paquetes</button>
          <button id="nuevoButton">Nuevo</button>
          <button>En oferta</button>
        </div>
      </section>

      <main className="catalog">
        {/* aca irian los product cards implementados, por ahora lo dejo sin hacer, dejo la simu abajo para que la pagina se vea llena */}
        {/* aca iria el catalogo de productos, por ahora uso la simulacion de productos */}
       <ProductCard
          title="Pelota de fútbol"
          description="Pelota oficial tamaño 5, ideal para partidos y entrenamientos."
          price="$1"
          image="https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        /> 
        {products.map(product => (
          <Link key={product.id} to="/productcard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard {...product} />
          </Link>
        ))}
      </main>
    </>
  );
};

export default Home; 