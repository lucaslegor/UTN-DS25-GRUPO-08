import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { 
    IconButton, 
    Menu as MuiMenu, 
    MenuItem, 
    ListItemIcon, 
    ListItemText,
    Divider 
} from '@mui/material';
import { Person, Policy, Logout } from '@mui/icons-material';
import CartIcon from './CartIcon';
import '../styles/navbar.css';

export const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsAdmin(!!token);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        setIsLogin(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsLogin(false);
        setUserMenuAnchor(null);
        navigate('/');
    };

    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const handleProfileClick = () => {
        navigate('/userProfile');
        handleUserMenuClose();
    };

    const handlePoliciesClick = () => {
        // TODO: Implementar navegación a Mis Pólizas
        console.log('Navegar a Mis Pólizas');
        handleUserMenuClose();
    };

    return (
        <header className='navbar'>
            <h1 className='title'> 
                <img src="MaxiColor.png" alt="" width={70} />
                MAPSASESORES
            </h1>

            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={30} /> : <MenuIcon size={30} />}
            </button>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <ul className='link-list'>
                    <li style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                        <Link className='link' to="/">Inicio</Link>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                        <Link className='link' to="/contacto">Contacto</Link>
                    </li>
                     {isAdmin && (
                        <li style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                            <Link className='link' to={"/adminpanel"}>Panel Admin</Link>
                        </li>
                    )}
                    <li style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                        <Link className='link' to="/cart"> <CartIcon/> </Link>
                    </li>
                    {isLogin ? (
                        <li style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                            <IconButton
                                onClick={handleUserMenuOpen}
                                sx={{
                                    color: '#1e43c0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        backgroundColor: 'rgba(30, 67, 192, 0.1)',
                                    },
                                }}
                            >
                                <AccountCircle sx={{ fontSize: 32 }} />
                            </IconButton>
                            <MuiMenu
                                anchorEl={userMenuAnchor}
                                open={Boolean(userMenuAnchor)}
                                onClose={handleUserMenuClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        minWidth: 200,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                        borderRadius: 2,
                                    }
                                }}
                            >
                                <MenuItem onClick={handleProfileClick}>
                                    <ListItemIcon>
                                        <Person fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Mi perfil</ListItemText>
                                </MenuItem>
                                
                                <MenuItem onClick={handlePoliciesClick}>
                                    <ListItemIcon>
                                        <Policy fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Mis pólizas</ListItemText>
                                </MenuItem>
                                
                                <Divider />
                                
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Cerrar sesión</ListItemText>
                                </MenuItem>
                            </MuiMenu>
                        </li>
                    ) : (
                        <li style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                            <button className="session-btn" onClick={() => navigate('/login')}>Iniciar sesión</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};
