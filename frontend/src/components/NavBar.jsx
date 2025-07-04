import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import '../styles/navbar.css';

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsAdmin(!!token);
    }, []);


    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsLogin(!!token);;
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLogin(false);
        navigate('/');
    };

    return (
        <header className='navbar'>
            <h1 className='title'> 
                <img src="MaxiColor.png" alt="" width={70} />
                MAPSASESORES
            </h1>

            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <ul className='link-list'>
                    <li>
                        <Link className='link' to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link className='link' to="/contacto">Contacto</Link>
                    </li>
                     {isAdmin && (
                        <li>
                            <Link className='link' to={"/adminpanel"}>Panel Admin</Link>
                        </li>
                    )}
                    {isLogin ? (
                        <>
                            <li>
                                <button className="session-btn" onClick={handleLogout}>Cerrar sesión</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button className="session-btn" onClick={() => navigate('/login')}>Iniciar sesión</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};
