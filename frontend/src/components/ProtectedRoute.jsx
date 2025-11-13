import { Navigate } from 'react-router-dom';
import { getAuth } from '../services/api';

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componente a renderizar si está autenticado
 * @param {boolean} props.requireAdmin - Si true, requiere rol ADMINISTRADOR
 */
export function ProtectedRoute({ children, requireAdmin = false }) {
  const auth = getAuth();
  
  // Si no hay usuario autenticado, redirigir a login
  if (!auth?.user) {
    return <Navigate to="/login" replace />;
  }
  
  // Si requiere admin y el usuario no es admin, redirigir a home
  if (requireAdmin && auth.user.rol !== 'ADMINISTRADOR') {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

