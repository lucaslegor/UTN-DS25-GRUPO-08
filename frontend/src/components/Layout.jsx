import React from 'react';
import { useLocation, Outlet } from 'react-router-dom'; // Agregá también Outlet
import '../styles/styles.css';
import Footer from './Footer';
import { NavBar } from './navBar';
import Login from './Login';

export const Layout = () => {
  const location = useLocation();

  // Si estoy en /login, solo renderizo el componente Login
  if (location.pathname === '/login') {
    return <Login />;
  }

  // Para cualquier otra ruta, renderizo el layout completo
  return (
    <>
      <NavBar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
