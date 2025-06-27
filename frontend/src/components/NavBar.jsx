import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import '../styles/navbar.css';

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

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
                        <ScrollLink className='link' to="inicio" smooth={true} duration={100} offset={50}>
                            <Link className='link' to={"/"}>Inicio</Link>
                        </ScrollLink>
                    </li>
                    <li>
                        <Link className='link' to={"/nosotros"}>Nosotros</Link>
                    </li> 
                    <li>
                        <ScrollLink className='link' to="contacto" smooth={true} duration={100} offset={-50}>
                            Contacto
                        </ScrollLink>
                    </li>

                    {isLogin ? (
                        <>
                            <li className="link" onClick={handleLogout}>
                                    Cerrar sesión
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link className='link' to={"/login"}>Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};
