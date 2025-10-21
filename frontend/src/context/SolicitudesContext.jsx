import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, getAuth } from '../services/api';

const SolicitudesContext = createContext();

// Hook personalizado para localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

export function SolicitudesProvider({ children }) {
  const [solicitudItem, setSolicitudItem] = useLocalStorage('solicitud', null);

  // Verificar si el usuario es administrador
  const isAdmin = () => {
    const auth = getAuth();
    return auth?.user?.rol === 'ADMINISTRADOR';
  };

  // Verificar si hay un producto en la solicitud
  const isInSolicitud = (productId) => {
    return solicitudItem && solicitudItem.id === productId;
  };

  // Agregar producto a la solicitud (solo uno a la vez)
  const addToSolicitud = (product) => {
    if (isAdmin()) {
      console.warn('Los administradores no pueden agregar productos a solicitudes');
      return;
    }

    if (!product || !product.id) {
      console.error('Producto inválido:', product);
      return;
    }

    setSolicitudItem({
      id: product.id,
      title: product.title || product.titulo,
      description: product.description || product.descripcion,
      image: product.image || product.imagenUrl,
      tipo: product.tipo,
      cobertura: product.cobertura,
    });
  };

  // Remover producto de la solicitud
  const removeFromSolicitud = () => {
    setSolicitudItem(null);
  };

  // Limpiar solicitud
  const clearSolicitud = () => {
    setSolicitudItem(null);
  };

  // Obtener el item actual
  const getCurrentItem = () => {
    return solicitudItem;
  };

  // Crear solicitud en el backend
  const createSolicitud = async (datosPersonales) => {
    try {
      if (isAdmin()) {
        throw new Error('Los administradores no pueden crear solicitudes');
      }

      if (!solicitudItem) {
        throw new Error('No hay producto seleccionado');
      }

      const response = await apiFetch('/api/solicitudes', {
        method: 'POST',
        body: { 
          items: [{ productId: solicitudItem.id, cantidad: 1 }],
          datosPersonales 
        }
      });

      if (response.success) {
        clearSolicitud();
        return response.data;
      } else {
        throw new Error(response.message || 'Error al crear la solicitud');
      }
    } catch (error) {
      console.error('Error creating solicitud:', error);
      throw error;
    }
  };

  // Obtener solicitudes del usuario
  const getSolicitudes = async () => {
    try {
      const response = await apiFetch('/api/solicitudes');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
      return [];
    }
  };

  const value = {
    solicitudItem,
    addToSolicitud,
    removeFromSolicitud,
    clearSolicitud,
    createSolicitud,
    getSolicitudes,
    isInSolicitud,
    getCurrentItem,
    isAdmin
  };

  return (
    <SolicitudesContext.Provider value={value}>
      {children}
    </SolicitudesContext.Provider>
  );
}

export function useSolicitudes() {
  const context = useContext(SolicitudesContext);
  if (!context) {
    throw new Error('useSolicitudes must be used within a SolicitudesProvider');
  }
  return context;
}
