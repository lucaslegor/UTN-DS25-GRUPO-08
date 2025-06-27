import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import { Hammer, Menu, X } from 'lucide-react';
import '../styles/navbar.css';

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsLogin(!!token);
    }, []);

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
                        <ScrollLink 
                            className='link' 
                            to="inicio" 
                            smooth={true} 
                            duration={100}
                            offset={50}
                        >
                            <Link className='link' to={"/"}>Inicio</Link>
                        </ScrollLink>
                    </li>
                    <li>
                        <Link className='link' to={"/nosotros"}>Nosotros</Link>
                    </li> 
                    <li>
                        <Link className='link' to={"/trabajos"}>Trabajos</Link>
                    </li>
                    <li>
                        <ScrollLink 
                            className='link' 
                            to="contacto" 
                            smooth={true} 
                            duration={100}
                            offset={-50}
                        >
                            Contacto
                        </ScrollLink>
                    </li>
                    {
                        isLogin ? (
                            <li>
                                 <Link className='link' to={"/login"}>Login</Link>
                            </li>
                        ) : null
                    } 
                </ul>
            </nav>
        </header>
    );
};