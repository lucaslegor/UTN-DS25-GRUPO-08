import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import '../styles/WhatsApp.css';

const WhatsAppFloat = () => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  
  // Configuración del número de WhatsApp - CAMBIA ESTE NÚMERO
  const WHATSAPP_NUMBER = '5491123456789'; // Reemplaza con tu número (sin + y sin espacios)
  
  // Pantallas donde NO mostrar el botón
  const hiddenPaths = [
    '/login',
    '/register', 
    '/forgot-password',
    '/reset-password',
    '/adminpanel'
  ];
  
  // Verificar si debe mostrar el botón
  const shouldShow = !hiddenPaths.some(path => location.pathname.startsWith(path));
  
  // Asegurar que el componente se monte en el cliente
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre sus servicios de seguros.');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  };
  
  if (!shouldShow || !mounted) return null;
  
  // Renderizar directamente en document.body usando Portal
  // Esto asegura que el botón esté fuera de cualquier contenedor que pueda interferir
  return createPortal(
    <div 
      className="whatsapp-float" 
      onClick={openWhatsApp}
      aria-label="Contactar por WhatsApp"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openWhatsApp();
        }
      }}
    >
      <Phone size={24} />
      <span className="whatsapp-tooltip">¡Chatea con nosotros!</span>
    </div>,
    document.body
  );
};

export default WhatsAppFloat;
