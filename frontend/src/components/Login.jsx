import React, { useState } from 'react'
import { Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'demo-token');
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <div className='principal-container-login'>
        <div className="content-wrapper-login">
          <div className="form-inicio-login">
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
            <div className='container-register'>
              <span>Todavia no tenes tu cuenta? Registrate aca</span>
              <Link className='link' to={"/login"}><Button variant="outlined" >Registrarse</Button></Link> 
            </div>
           
          </div>
          <div className="container-login">
            <img src="MaxiColor.png" alt="" width={350} />
            <h2>¡Bienvenido a Maps, tu bienestar es nuestro compromiso!</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
