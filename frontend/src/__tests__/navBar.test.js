import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { act } from 'react';
import { SolicitudesProvider } from '../context/SolicitudesContext';

// Mockear el módulo api.js para evitar el problema de import.meta.env
jest.mock('../services/api', () => ({
  getMeApi: jest.fn(() => Promise.resolve({ user: { idUsuario: 1, username: 'mockuser', mail: 'mock@example.com', rol: 'USUARIO' } })),
  logoutApi: jest.fn(() => Promise.resolve()),
}));

describe('NavBar - Estados de Autenticación', () => {
  let localStorageMock = {};

  beforeEach(() => {
    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => localStorageMock[key] || null),
        setItem: jest.fn((key, value) => { localStorageMock[key] = value + ''; }),
        removeItem: jest.fn((key) => { delete localStorageMock[key]; }),
        clear: jest.fn(() => { localStorageMock = {}; }),
      },
      writable: true,
    });
    localStorage.clear();
  });

  afterEach(() => {
    cleanup(); // Limpiar el DOM después de cada test
  });

  const renderNavBar = () => {
    render(
      <Router>
        <SolicitudesProvider>
          <NavBar />
        </SolicitudesProvider>
      </Router>
    );
  };

  // Debería mostrar el botón "Iniciar sesión" cuando no está autenticado
  it('should display "Iniciar sesión" button when not authenticated', () => {
    renderNavBar();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/foto de perfil/i)).not.toBeInTheDocument(); // No debería haber icono de perfil
  });

  // Debería mostrar el icono del menú de usuario cuando está autenticado
  it('should display user menu icon when authenticated', () => {
    act(() => {
      localStorage.setItem('auth', JSON.stringify({ token: 'mock_token', user: { idUsuario: 1, username: 'testuser', mail: 'test@example.com', rol: 'USUARIO' } }));
    });
    renderNavBar();
    expect(screen.queryByRole('button', { name: /iniciar sesión/i })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/cuenta de usuario/i)).toBeInTheDocument(); // Icono de cuenta con aria-label
  });

  // Debería mostrar el enlace "Panel Admin" cuando está autenticado como ADMINISTRADOR
  it('should display "Panel Admin" link when authenticated as ADMINISTRADOR', () => {
    act(() => {
      localStorage.setItem('auth', JSON.stringify({ token: 'mock_token', user: { idUsuario: 1, username: 'adminuser', mail: 'admin@example.com', rol: 'ADMINISTRADOR' } }));
    });
    renderNavBar();
    expect(screen.getByRole('link', { name: /panel admin/i })).toBeInTheDocument();
  });

  // No debería mostrar el enlace "Panel Admin" cuando está autenticado como USUARIO
  it('should not display "Panel Admin" link when authenticated as USUARIO', () => {
    act(() => {
      localStorage.setItem('auth', JSON.stringify({ token: 'mock_token', user: { idUsuario: 1, username: 'testuser', mail: 'test@example.com', rol: 'USUARIO' } }));
    });
    renderNavBar();
    expect(screen.queryByRole('link', { name: /panel admin/i })).not.toBeInTheDocument();
  });
});
