import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import '../styles/App.css';
import Footer from './Footer';
import { NavBar } from './NavBar';
import Login from './Login';

export const Layout = () => {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <Login />;
  }

  return (
    <div className="app-layout">
      <NavBar />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
