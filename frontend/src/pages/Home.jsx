import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import ProductCard from '../components/ProductCard';
import NavButton from '../components/NavButton';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const defaultProducts = [
  {
    id: 1,
    title: "Seguro de Auto",
    description: "Protección completa para tu vehículo ante accidentes, robos y daños a terceros.",
    price: "$10.000/año",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Seguro de Hogar",
    description: "Cubre daños por incendio, robo y responsabilidad civil en tu vivienda.",
    price: "$8.000/año",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Seguro de Vida",
    description: "Garantiza el bienestar de tus seres queridos ante cualquier eventualidad.",
    price: "$12.000/año",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Seguro de Salud",
    description: "Acceso a la mejor atención médica y cobertura de gastos hospitalarios.",
    price: "$15.000/año",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
   const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    setProducts(JSON.parse(storedProducts));
  } else {
    setProducts(defaultProducts);
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
  }, []);

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(search.toLowerCase()) ||
    product.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className="page-nav" style={{ justifyContent: 'center' }}>
        <NavButton
          image="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80"
          icon={InfoIcon}
          label="Nosotros"
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

      <section className="filters" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2.5rem 0 2rem 0',
        minHeight: 140,
        background: 'linear-gradient(90deg, #fff 60%, #1e43c0 100%)',
        borderRadius: 25,
        boxShadow: '0 4px 24px 0 rgba(30,67,192,0.10)',
        padding: '2.5rem 1.5rem',
        width: '100%',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <TextField
          variant="outlined"
          placeholder="Buscar productos..."
          size="medium"
          value={search}
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#1e43c0', fontSize: 36 }} />
              </InputAdornment>
            ),
            style: {
              background: '#fff',
              borderRadius: 40,
              boxShadow: '0 2px 16px 0 rgba(30,67,192,0.10)',
              paddingLeft: 12,
              paddingRight: 12,
              fontSize: '1.3rem',
              minHeight: 64,
              height: 64,
              fontWeight: 500,
            },
            disableUnderline: true,
          }}
          sx={{
            minWidth: { xs: 260, sm: 500, md: 700 },
            maxWidth: 900,
            borderRadius: 40,
            backgroundColor: '#fff',
            boxShadow: '0 2px 16px 0 rgba(30,67,192,0.10)',
            transition: 'box-shadow 0.2s',
            '& .MuiInputBase-root': {
              borderRadius: 40,
              backgroundColor: '#fff',
              boxShadow: '0 2px 16px 0 rgba(30,67,192,0.10)',
              border: 'none',
            },
            '& .MuiInput-root:before, & .MuiInput-root:after': {
              borderBottom: 'none !important',
            },
            '& .MuiInput-underline:before, & .MuiInput-underline:after': {
              borderBottom: 'none !important',
            },
            input: {
              fontSize: '1.3rem',
              fontWeight: 500,
            },
          }}
        />
      </section>

      <main className="catalog">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link
              key={product.id}
              to="/productcard"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ProductCard {...product} />
            </Link>
          ))
        ) : (
          <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
            No se encontraron productos que coincidan con la búsqueda.
          </p>
        )}
      </main>
    </>
  );
};

export default Home;
