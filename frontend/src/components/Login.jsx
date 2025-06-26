import React, { useState } from 'react'
import { Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // For demo purposes, using hardcoded credentials
    // In a real application, this should be handled by a backend service
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token');
      navigate('/admin/panel');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className='principal-container-login'>
        <div className="content-wrapper-login">
          <div className="form-inicio-login">
            <h2>
              <img className='logo-login' src="/fotos/vintage.png" alt="vintageherreria"/>
            </h2>
            <h3>¡Hola, bienvenido!</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grupo-login">
                <label htmlFor="usuario">Usuario:</label>
                <input
                  className='input-login'
                  type="text"
                  id="user"
                  name="user"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Introduce tu usuario"
                  required
                />
              </div>
              <div className="form-grupo-login">
                <label htmlFor="password">Contraseña:</label>
                <input
                  className='input-login'
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu contraseña"
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button className='submit-button-login' type="submit">Ingresar</button>
            </form>
          </div>
          <div className="container-login">
            <h2>Vintage Herreria</h2>
            <h3>SERVICIOS DE HERRERIA </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
