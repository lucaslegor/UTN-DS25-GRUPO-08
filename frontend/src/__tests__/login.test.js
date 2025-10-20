import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';

// Mockear useNavigate ya que el componente Login lo utiliza
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

// Mockear el módulo api.js para evitar el problema de import.meta.env
jest.mock('../services/api', () => ({
  loginApi: jest.fn(() => Promise.resolve({ token: 'mock_token', user: { idUsuario: 1, username: 'testuser', mail: 'test@example.com', rol: 'USUARIO' } })),
}));

describe('Componente de Login', () => {
  beforeEach(() => {
    mockedUseNavigate.mockClear();
  });

  // Debería renderizar los campos de usuario/email y contraseña y un botón de enviar
  it('should render username/email and password fields and a submit button', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/Usuario o Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  // Debería llamar a loginApi y navegar a la página de inicio en un envío de formulario exitoso
  it('should call loginApi and navigate to home on successful form submission', async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <Login />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/Usuario o Email:/i);
    const passwordInput = screen.getByLabelText(/Contraseña:/i);
    const submitButton = screen.getByRole('button', { name: /Ingresar/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    const { loginApi } = require('../services/api');
    expect(loginApi).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  // Debería navegar a /register cuando se hace clic en el botón "Registrarse"
  it('should navigate to /register when "Registrarse" button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <Login />
      </Router>
    );

    const registerButton = screen.getByRole('button', { name: /Registrarse/i });
    await user.click(registerButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/register');
  });

  // Debería navegar a /forgot-password cuando se hace clic en el botón "¿Olvidaste tu contraseña?"
  it('should navigate to /forgot-password when "¿Olvidaste tu contraseña?" button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <Login />
      </Router>
    );

    const forgotPasswordButton = screen.getByRole('button', { name: /¿Olvidaste tu contraseña?/i });
    await user.click(forgotPasswordButton);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/forgot-password');
  });
});
