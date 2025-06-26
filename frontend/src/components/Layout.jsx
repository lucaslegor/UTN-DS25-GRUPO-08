import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Layout = ({ children }) => (
  <div className="app-layout">
    <header className="header">
      <h1><Link to="/">Maps</Link></h1>
      <div className="auth-buttons">
        <button>Login</button>
        <button>Register</button>
      </div>
    </header>
    <main style={{ flex: 1 }}>{children}</main>
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Maps. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
);

export default Layout; 